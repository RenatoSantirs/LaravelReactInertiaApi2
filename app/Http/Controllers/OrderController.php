<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['user'])
            ->forUser(auth()->user())
            ->latest()
            ->get();

        return inertia('Orders/Index', [
            'orders' => $orders,
        ]);
    }

    public function show(Order $order)
    {
        $this->authorize('view', $order);

        $order->load(['items.product','items.returns', 'user']);

        return inertia('Orders/Show', [
            'order' => $order,
        ]);
    }

    public function misCompras()
    {
        $orders = Order::with(['items.product'])
            ->where('user_id', auth()->id())
            ->latest()
            ->paginate(10);

        return inertia('Orders/MisCompras', [
            'orders' => $orders,
        ]);
    }
}
