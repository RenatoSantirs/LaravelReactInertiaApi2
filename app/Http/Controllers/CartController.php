<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        $cart = session()->get('cart', []);

        return Inertia::render('Cart/Index', [
            'cart' => array_values($cart),
            'total' => collect($cart)->sum('subtotal'),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity'   => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($request->product_id);
        $cart = session()->get('cart', []);

        if (isset($cart[$product->id])) {
            $cart[$product->id]['quantity'] += $request->quantity;
        } else {
            $cart[$product->id] = [
                'id'       => $product->id,
                'nombre'   => $product->nombre,
                'precio'   => $product->precio,
                'quantity' => $request->quantity,
            ];
        }

        $cart[$product->id]['subtotal'] =
            $cart[$product->id]['quantity'] * $product->precio;

        session()->put('cart', $cart);

        return redirect()->route('cart.index')
            ->with('success', 'Producto agregado al carrito');
    }

    public function destroy(Product $product)
    {
        $cart = session()->get('cart', []);

        unset($cart[$product->id]);

        session()->put('cart', $cart);

        return back()->with('success', 'Producto eliminado del carrito');
    }
}
