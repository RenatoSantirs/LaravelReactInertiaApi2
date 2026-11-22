<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Enums\PermissionEnum;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\PermissionRegistrar;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // 🚀 Limpiar cache de permisos
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // === CREAR PERMISOS ===
        $permissions = [
            // Users
            PermissionEnum::VIEW_USERS,
            PermissionEnum::CREATE_USERS,
            PermissionEnum::EDIT_USERS,
            PermissionEnum::DELETE_USERS,

            // Contacts
            PermissionEnum::VIEW_CONTACTS,
            PermissionEnum::CREATE_CONTACTS,
            PermissionEnum::EDIT_CONTACTS,
            PermissionEnum::DELETE_CONTACTS,

            // Streams
            PermissionEnum::VIEW_STREAMS,
            PermissionEnum::CREATE_STREAMS,
            PermissionEnum::EDIT_STREAMS,
            PermissionEnum::DELETE_STREAMS,
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // === ROLES ===
        $admin   = Role::firstOrCreate(['name' => 'admin']);
        $gerente = Role::firstOrCreate(['name' => 'gerente']);
        $user    = Role::firstOrCreate(['name' => 'user']);

        // === ASIGNAR PERMISOS ===

        // 🧑‍💼 Admin → todos
        $admin->syncPermissions(Permission::all());

        // 👨‍💻 Gerente
        $gerente->syncPermissions([
            PermissionEnum::VIEW_USERS,
            PermissionEnum::CREATE_USERS,
            PermissionEnum::EDIT_USERS,

            PermissionEnum::VIEW_CONTACTS,
            PermissionEnum::CREATE_CONTACTS,
            PermissionEnum::EDIT_CONTACTS,

            PermissionEnum::VIEW_STREAMS,
            PermissionEnum::CREATE_STREAMS,
            PermissionEnum::EDIT_STREAMS,
        ]);

        // 👤 Usuario normal
        $user->syncPermissions([
            PermissionEnum::VIEW_CONTACTS,
            PermissionEnum::CREATE_CONTACTS,

            PermissionEnum::VIEW_STREAMS,
            PermissionEnum::CREATE_STREAMS,
        ]);

        // === USUARIOS DE PRUEBA ===

        $adminUser = User::firstOrCreate(
            ['email' => 'admin1@admin.com'],
            ['name' => 'admin', 'password' => Hash::make('123456789')]
        );
        $adminUser->syncRoles(['admin']);

        $gerenteUser = User::firstOrCreate(
            ['email' => 'gerente@gmail.com'],
            ['name' => 'gerente', 'password' => Hash::make('123456789')]
        );
        $gerenteUser->syncRoles(['gerente']);

        $normalUser = User::firstOrCreate(
            ['email' => 'user@gmail.com'],
            ['name' => 'user', 'password' => Hash::make('123456789')]
        );
        $normalUser->syncRoles(['user']);
    }
}
