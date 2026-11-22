<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use MercadoPago\MercadoPagoConfig;
use MercadoPago\Client\Payment\PaymentClient;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderItem;

class WebhookController extends Controller
{
    public function webhook(Request $request)
    {
        Log::info('Webhook recibido', $request->all());

        // Solo pagos
        if (($request->type ?? $request->topic) !== 'payment') {
            return response()->json(['status' => 'ignored']);
        }

        $paymentId = $request->data['id'] ?? $request->id;

        MercadoPagoConfig::setAccessToken(config('services.mercadopago.token'));

        $payment = (new PaymentClient())->get($paymentId);

        // Solo aprobados
        if ($payment->status !== 'approved') {
            return response()->json(['status' => 'not approved']);
        }

        // Evitar duplicados
        if (Order::where('payment_id', $payment->id)->exists()) {
            return response()->json(['status' => 'already processed']);
        }

        // 🔑 USAMOS external_reference
        if (!$payment->external_reference) {
            Log::error('Pago sin external_reference');
            return response()->json(['status' => 'missing reference']);
        }

        $data = json_decode($payment->external_reference, true);

        if (!$data || empty($data['cart']) || empty($data['user_id'])) {
            Log::error('external_reference inválido', [
                'external_reference' => $payment->external_reference
            ]);
            return response()->json(['status' => 'invalid reference']);
        }

        $cart = array_values($data['cart']);
        $userId = $data['user_id'];

        DB::transaction(function () use ($cart, $userId, $payment) {

            // 🧾 crear orden
            $order = Order::create([
                'user_id'    => $userId,
                'payment_id' => $payment->id,
                'total'      => 0,
                'status'     => 'approved',
            ]);

            $total = 0;

            // 📦 items
            foreach ($cart as $item) {

                $product = Product::lockForUpdate()->findOrFail($item['id']);

                if ($product->stock < $item['quantity']) {
                    throw new \Exception('Stock insuficiente');
                }

                // bajar stock
                $product->decrement('stock', $item['quantity']);

                $subtotal = $product->precio * $item['quantity'];
                $total += $subtotal;

                OrderItem::create([
                    'order_id'   => $order->id,
                    'product_id' => $product->id,
                    'quantity'   => $item['quantity'],
                    'price'      => $product->precio,
                    'subtotal'   => $subtotal,
                ]);
            }

            // 💰 total final
            $order->update(['total' => $total]);

            Log::info('Orden creada correctamente', [
                'order_id' => $order->id,
                'total'    => $total,
            ]);
        });

        return response()->json(['status' => 'ok']);
    }
}
