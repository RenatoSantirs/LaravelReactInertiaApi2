<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'payment_id',
        'total',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    // 🔒 scope PRO
    public function scopeForUser($query, $user)
    {
        if ($user->hasRole('admin')) {
            return $query;
        }

        return $query->where('user_id', $user->id);
    }
}
