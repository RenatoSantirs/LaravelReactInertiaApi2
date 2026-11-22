<?php

namespace App\Http\Controllers;

use App\Models\OrderItem;
use App\Models\OrderItemReturn;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderItemReturnController extends Controller
{
    public function store(Request $request, OrderItem $item)
    {
        $this->authorize('view', $item->order);

        // evitar doble devolución
        if ($item->returns()->exists()) {
            abort(400, 'Este producto ya fue devuelto');
        }

        $quantity = $item->quantity;
        $amount = $item->subtotal;

        DB::transaction(function () use ($item, $quantity, $amount) {

            OrderItemReturn::create([
                'order_item_id' => $item->id,
                'user_id'       => auth()->id(),
                'quantity'      => $quantity,
                'amount'        => $amount,
                'status'        => 'pending',
            ]);

            // 🔄 devolver stock
            $item->product->increment('stock', $quantity);
        });

        return back()->with('success', 'Solicitud de devolución creada');
    }
    public function index()
    {
        $returns = OrderItemReturn::with([
            'orderItem.order',
            'orderItem.product',
            'user',
        ])->latest()->get();

        return inertia('Returns/Index', [
            'returns' => $returns,
        ]);
    }
}
