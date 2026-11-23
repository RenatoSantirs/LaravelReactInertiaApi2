<?php

namespace App\Policies;

use App\Models\Order;
use App\Models\User;

class OrderPolicy
{
    public function view(User $user, Order $order): bool
    {
        // El dueño de la orden
        if ($order->user_id === $user->id) {
            return true;
        }

        // Admin (rol de Spatie)
        return $user->hasRole('admin');
    }
}
