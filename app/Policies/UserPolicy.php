<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    public function viewAny(User $user): bool
    {
        // // Solo el admin puede listar usuarios
        // return $user->hasRole('admin');
        return $user->can('view users');

    }

    public function view(User $user, User $model): bool
    {
        // // Solo admin puede ver otros usuarios
        // return $user->hasRole('admin');
        return $user->can('view users');

    }

    public function create(User $user): bool
    {
        // return $user->hasRole('admin');
        return $user->can('create users');

    }

    public function update(User $user, User $model): bool
    {
        // return $user->hasRole('admin');
        return $user->can('edit users');
    }

    public function delete(User $user, User $model): bool
    {
        // return $user->hasRole('admin');
        return $user->can('delete users');
    }
}