<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Contact;
use App\Enums\PermissionEnum;

class ContactPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can(PermissionEnum::VIEW_CONTACTS);
    }

    public function view(User $user, Contact $contact): bool
    {
        return $user->can(PermissionEnum::VIEW_CONTACTS);
    }

    public function create(User $user): bool
    {
        return $user->can(PermissionEnum::CREATE_CONTACTS);
    }

    public function update(User $user, Contact $contact): bool
    {
        return $user->can(PermissionEnum::EDIT_CONTACTS);
    }

    public function delete(User $user, Contact $contact): bool
    {
        return $user->can(PermissionEnum::DELETE_CONTACTS);
    }
}
