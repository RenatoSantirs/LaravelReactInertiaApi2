<?php

it('rechaza listar alimentos sin login', function () {
    $this->getJson('/api/foods')->assertUnauthorized();
});

it('rechaza crear alimentos sin login', function () {
    $this->postJson('/api/foods', ['nombre' => 'Arroz', 'cantidad' => 10])
        ->assertUnauthorized();
});
