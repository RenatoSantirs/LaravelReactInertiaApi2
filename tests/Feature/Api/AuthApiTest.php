<?php

use App\Models\User;
use Database\Seeders\RolePermissionSeeder;
use Laravel\Sanctum\Sanctum;

// Antes de cada test: crea los roles y permisos (el registro necesita el rol "user")
beforeEach(function () {
    $this->seed(RolePermissionSeeder::class);
});

// ---------- REGISTRO ----------

it('registra un usuario con el rol user', function () {
    $this->postJson('/api/register', [
        'name' => 'Renato',
        'email' => 'renato@example.com',
        'password' => '123456',
    ])->assertOk()->assertJsonPath('role', 'user');

    $this->assertDatabaseHas('users', ['email' => 'renato@example.com']);
});

it('no registra con datos inválidos', function () {
    $this->postJson('/api/register', [])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['name', 'email', 'password']);
});

it('no registra un email repetido', function () {
    $existing = User::factory()->create();

    $this->postJson('/api/register', [
        'name' => 'Otro',
        'email' => $existing->email,
        'password' => '123456',
    ])->assertUnprocessable()->assertJsonValidationErrors('email');
});

// ---------- LOGIN ----------

it('hace login y devuelve un token', function () {
    $user = User::factory()->create(); // la contraseña de la factory es "password"

    $this->postJson('/api/login', [
        'email' => $user->email,
        'password' => 'password',
    ])->assertOk()->assertJsonStructure(['message', 'token']);
});

it('rechaza el login con contraseña incorrecta', function () {
    $user = User::factory()->create();

    $this->postJson('/api/login', [
        'email' => $user->email,
        'password' => 'incorrecta',
    ])->assertUnauthorized();
});

it('rechaza el login de un usuario inactivo', function () {
    $user = User::factory()->create(['status' => 0]);

    $this->postJson('/api/login', [
        'email' => $user->email,
        'password' => 'password',
    ])->assertForbidden();
});

// ---------- /me ----------

it('rechaza /api/me sin token', function () {
    $this->getJson('/api/me')->assertUnauthorized();
});

it('permite /api/me con usuario autenticado', function () {
    Sanctum::actingAs(User::factory()->create());

    $this->getJson('/api/me')->assertOk();
});

// ---------- LOGOUT ----------

it('logout cierra solo la sesión actual', function () {
    $user = User::factory()->create();
    $token = $user->createToken('api_token')->plainTextToken;
    $user->createToken('otro_dispositivo');

    $this->withToken($token)->postJson('/api/logout')->assertOk();

    expect($user->tokens()->count())->toBe(1);
});

it('logout-all cierra todas las sesiones', function () {
    $user = User::factory()->create();
    $token = $user->createToken('api_token')->plainTextToken;
    $user->createToken('otro_dispositivo');

    $this->withToken($token)->postJson('/api/logout-all')->assertOk();

    expect($user->tokens()->count())->toBe(0);
});
