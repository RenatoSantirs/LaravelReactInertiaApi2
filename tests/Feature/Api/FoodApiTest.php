<?php

use App\Models\Food;
use App\Models\User;
use Laravel\Sanctum\Sanctum;

beforeEach(function () {
    Sanctum::actingAs(User::factory()->create());
});

it('lista los alimentos', function () {
    Food::factory()->count(3)->create();

    $this->getJson('/api/foods')
        ->assertOk()
        ->assertJsonCount(3);
});

it('crea un alimento', function () {
    $this->postJson('/api/foods', ['nombre' => 'Arroz', 'cantidad' => 10])
        ->assertCreated()
        ->assertJsonPath('nombre', 'Arroz');

    $this->assertDatabaseHas('food', ['nombre' => 'Arroz', 'cantidad' => 10]);
});

it('valida los datos al crear', function () {
    $this->postJson('/api/foods', [])
        ->assertUnprocessable()
        ->assertJsonValidationErrors(['nombre', 'cantidad']);
});

it('muestra un alimento', function () {
    $food = Food::factory()->create();

    $this->getJson("/api/foods/{$food->id}")
        ->assertOk()
        ->assertJsonPath('nombre', $food->nombre);
});

it('devuelve 404 si el alimento no existe', function () {
    $this->getJson('/api/foods/9999')
        ->assertNotFound()
        ->assertJson(['message' => 'Alimento no encontrado']);
});

it('actualiza un alimento', function () {
    $food = Food::factory()->create(['cantidad' => 5]);

    $this->putJson("/api/foods/{$food->id}", ['cantidad' => 50])
        ->assertOk()
        ->assertJsonPath('cantidad', 50);

    $this->assertDatabaseHas('food', ['id' => $food->id, 'cantidad' => 50]);
});

it('elimina un alimento', function () {
    $food = Food::factory()->create();

    $this->deleteJson("/api/foods/{$food->id}")->assertOk();

    $this->assertDatabaseMissing('food', ['id' => $food->id]);
});
