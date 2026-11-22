<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class StoreController extends Controller
{
    public function index()
    {
        $products = Product::where('stock', '>', 0)
            ->orderBy('id', 'desc')
            ->paginate(9);

        return Inertia::render('Store/Index', [
            'products' => $products,
        ]);
    }

    public function show(Product $product)
    {
        return Inertia::render('Store/Show', [
            'product' => $product,
        ]);
    }
}
