<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\PermissionRegistrar;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // 🚀 Limpiar cache
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // === Permisos de contactos ===
        $contactPermissions = [
            'view contacts',
            'create contacts',
            'edit contacts',
            'delete contacts',
        ];

        foreach ($contactPermissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // === Permisos de usuarios ===
        $userPermissions = [
            'view users',
            'create users',
            'edit users',
            'delete users',
        ];

        foreach ($userPermissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // === Roles ===
        $admin   = Role::firstOrCreate(['name' => 'admin']);
        $gerente = Role::firstOrCreate(['name' => 'gerente']);
        $user    = Role::firstOrCreate(['name' => 'user']);

        // === Asignar permisos ===

        // 🧑‍💼 Admin → todos los permisos
        $admin->syncPermissions(Permission::all());

        // 👨‍💻 Gerente → solo ver y editar usuarios + contactos
        $gerente->syncPermissions([
            'view users', 'edit users','create users',
            'view contacts', 'edit contacts','create contacts'
        ]);

        // 👤 Usuario normal → ver y crear contactos
        $user->syncPermissions(['view contacts', 'create contacts']);

        // === Crear usuarios de ejemplo ===

        $u = User::firstOrCreate(
            ['email' => 'admin1@admin.com'],
            ['name' => 'admin', 'password' => Hash::make('123456789')]
        );
        $u->syncRoles(['admin']);

        $g = User::firstOrCreate(
            ['email' => 'gerente@gmail.com'],
            ['name' => 'gerente', 'password' => Hash::make('123456789')]
        );
        $g->syncRoles(['gerente']);

        $u2 = User::firstOrCreate(
            ['email' => 'user@gmail.com'],
            ['name' => 'user', 'password' => Hash::make('123456789')]
        );
        $u2->syncRoles(['user']);
    }
}



//SI ES SOLO EL ADMIN EL QUE ADMINISTRA USER
// <?php

// namespace Database\Seeders;

// use Illuminate\Database\Seeder;
// use App\Models\User;
// use Spatie\Permission\Models\Role;
// use Spatie\Permission\Models\Permission;
// use Illuminate\Support\Facades\Hash;

// class RolePermissionSeeder extends Seeder
// {
//     public function run(): void
//     {
//         // 🚀 Limpiar cache
//         app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

//         // === Crear permisos (solo contactos, ya que users se manejan por rol) ===
//         $permissions = [
//             'view contacts',
//             'create contacts',
//             'edit contacts',
//             'delete contacts',
//         ];

//         foreach ($permissions as $permission) {
//             Permission::firstOrCreate(['name' => $permission]);
//         }

//         // === Crear roles ===
//         $admin = Role::firstOrCreate(['name' => 'admin']);
//         $user  = Role::firstOrCreate(['name' => 'user']);

//         // === Asignar permisos ===
//         // Admin tiene todos los permisos (contacts + cualquier otro futuro)
//         $admin->syncPermissions(Permission::all());

//         // User solo puede ver y crear contactos
//         $user->syncPermissions(['view contacts', 'create contacts']);

//         // === Crear usuarios de ejemplo ===
//         $u = User::firstOrCreate(
//             ['email' => 'admin1@admin.com'],
//             [
//                 'name' => 'admin',
//                 'password' => Hash::make('123456789'),
//             ]
//         );
//         $u->syncRoles(['admin']);

//         $u2 = User::firstOrCreate(
//             ['email' => 'user@gmail.com'],
//             [
//                 'name' => 'user',
//                 'password' => Hash::make('123456789'),
//             ]
//         );
//         $u2->syncRoles(['user']);
//     }
// }
