<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\OrderItemReturn;
use MercadoPago\Client\Payment\PaymentClient;
use MercadoPago\MercadoPagoConfig;
use Illuminate\Support\Facades\DB;

class OrderReturnApprovalController extends Controller
{
    public function approve(OrderItemReturn $return)
    {
        // 🔐 SOLO ADMIN (policy luego)
        $this->authorize('approve', $return);

        if ($return->status !== 'pending') {
            abort(400, 'La devolución ya fue procesada');
        }

        $order = $return->orderItem->order;

        MercadoPagoConfig::setAccessToken(
            config('services.mercadopago.token')
        );

        $client = new PaymentClient();

        DB::transaction(function () use ($client, $return, $order) {

            // 💸 REEMBOLSO REAL
            $client->refund(
                $order->payment_id,
                [
                    'amount' => (float) $return->amount
                ]
            );

            // ✅ marcar devolución
            $return->update([
                'status' => 'approved',
            ]);

            // 🔻 ajustar total de la orden
            $order->decrement('total', $return->amount);
        });

        return back()->with('success', 'Reembolso realizado correctamente');
    }
}
