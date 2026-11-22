<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItemReturn extends Model
{
    protected $fillable = [
        'order_item_id',
        'user_id',
        'quantity',
        'amount',
        'reason',
        'status',
    ];

    public function orderItem()
    {
        return $this->belongsTo(OrderItem::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
