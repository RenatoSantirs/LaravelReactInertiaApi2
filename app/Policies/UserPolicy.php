<?php

namespace App\Policies;

use App\Models\User;
use App\Enums\PermissionEnum;

class UserPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can(PermissionEnum::VIEW_USERS);
    }

    public function view(User $user, User $model): bool
    {
        return $user->can(PermissionEnum::VIEW_USERS);
    }

    public function create(User $user): bool
    {
        return $user->can(PermissionEnum::CREATE_USERS);
    }

    public function update(User $user, User $model): bool
    {
        return $user->can(PermissionEnum::EDIT_USERS);
    }

    public function delete(User $user, User $model): bool
    {
        return $user->can(PermissionEnum::DELETE_USERS);
    }
}
