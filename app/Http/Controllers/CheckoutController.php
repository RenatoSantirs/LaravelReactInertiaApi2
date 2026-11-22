<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use MercadoPago\Client\Preference\PreferenceClient;
use MercadoPago\MercadoPagoConfig;

class CheckoutController extends Controller
{

    public function checkout(Request $request)
    {
        $cart = session('cart', []);

        abort_if(empty($cart), 400, 'Carrito vacío');

        MercadoPagoConfig::setAccessToken(config('services.mercadopago.token'));

        $items = [];
        foreach ($cart as $item) {
            $items[] = [
                'title' => $item['nombre'],
                'quantity' => $item['quantity'],
                'unit_price' => (float) $item['precio'],
            ];
        }


        $client = new PreferenceClient();

        $preference = $client->create([
            'items' => $items,
            'external_reference' => json_encode([
                'cart' => array_values($cart),
                'user_id' => auth()->id(),
            ]),
            'notification_url' => config('app.url') . '/webhook/mercadopago',
            'back_urls' => [
                'success' => route('orders.index'),
                'failure' => route('cart.index'),
            ],
            'auto_return' => 'approved',
        ]);

        return inertia('Checkout/Index', [
            'preferenceId' => $preference->id,
        ]);
    }
}
