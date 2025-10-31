<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    public function index(User $user)
    {
        $this->authorize('view users', $user);
        $users = User::with('roles')->get();
        return Inertia::render('Users/Index', compact('users'));
    }

    public function create()
    {
        $this->authorize('create', User::class);
        $roles = Role::all();
        return Inertia::render('Users/Create', compact('roles'));
    }

    public function store(Request $request)
    {
        $this->authorize('create', User::class);
        $data = $request->validate([
            'name'     => 'required|string',
            'email'    => 'required|email|unique:users',
            'password' => 'required|string|min:6',
            'roles'    => 'required|array',
            'status'   => 'required|boolean',
        ]);

        $user = User::create([
            'name'     => $data['name'],
            'email'    => $data['email'],
            'password' => bcrypt($data['password']),
            'status'   => $data['status'],
        ]);

        $user->syncRoles($data['roles']);

        return redirect()->route('users.index')->with('success', 'Usuario creado correctamente');
    }

    public function edit(User $user)
    {
        $this->authorize('update', $user);
        $roles = Role::all();

        // 🔥 Importante: cargar la relación roles del usuario
        $user->load('roles');

        return Inertia::render('Users/Edit', [
            'user' => $user,
            'roles' => $roles,
        ]);
    }

    public function update(Request $request, User $user)
    {
        $this->authorize('update', $user);
        $data = $request->validate([
            'name'  => 'required|string',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'roles' => 'required|array',
            'status' => 'required|boolean',
        ]);

        $user->update([
            'name'  => $data['name'],
            'email' => $data['email'],
            'status' => $data['status'],
        ]);

        if ($request->filled('password')) {
            $user->update(['password' => bcrypt($request->password)]);
        }

        $user->syncRoles($data['roles']);

        return redirect()->route('users.index')->with('success', 'Usuario actualizado correctamente');
    }

    public function destroy(User $user)
    {
        $this->authorize('delete', $user);
        $user->delete();
        return redirect()->route('users.index')->with('success', 'Usuario eliminado');
    }
}
