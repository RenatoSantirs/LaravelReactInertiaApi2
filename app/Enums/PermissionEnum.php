<?php

namespace App\Enums;

class PermissionEnum
{
    // Users
    public const VIEW_USERS   = 'view users';
    public const CREATE_USERS = 'create users';
    public const EDIT_USERS   = 'edit users';
    public const DELETE_USERS = 'delete users';

    // Contacts
    public const VIEW_CONTACTS   = 'view contacts';
    public const CREATE_CONTACTS = 'create contacts';
    public const EDIT_CONTACTS   = 'edit contacts';
    public const DELETE_CONTACTS = 'delete contacts';

    // Streams
    public const VIEW_STREAMS   = 'view streams';
    public const CREATE_STREAMS = 'create streams';
    public const EDIT_STREAMS   = 'edit streams';
    public const DELETE_STREAMS = 'delete streams';
}
