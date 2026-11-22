<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use MercadoPago\MercadoPagoConfig;
use MercadoPago\Client\Preference\PreferenceClient;

class PaymentController extends Controller
{
    public function createPreference(Request $request, Product $product)
    {
        $quantity = max(1, (int) $request->input('quantity', 1));

        if ($quantity > $product->stock) {
            return response()->json([
                'message' => 'Stock insuficiente'
            ], 422);
        }

        MercadoPagoConfig::setAccessToken(config('services.mercadopago.token'));

        $client = new PreferenceClient();

        $preference = $client->create([
            'items' => [
                [
                    'id' => (string) $product->id,
                    'title' => $product->nombre,
                    'quantity' => $quantity,
                    'unit_price' => (float) $product->precio,
                ]
            ],

            // 👇 USAR ESTO
            'external_reference' => json_encode([
                'product_id' => $product->id,
                'quantity'   => $quantity,
                'user_id'    => Auth::id(),
            ]),

            'notification_url' => config('app.url') . '/webhook/mercadopago',
        ]);

        return response()->json([
            'preferenceId' => $preference->id
        ]);
    }
}
