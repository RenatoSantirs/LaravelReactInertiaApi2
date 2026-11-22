<?php

use Illuminate\Support\Facades\Auth;

test('registration screen can be rendered', function () {
    $response = $this->get(route('register'));

    $response->assertStatus(200);
});

test('new users can register', function () {
    $response = $this->post(route('register'), [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    // Debug info - ESTO ES NUEVO
    if (!Auth::check()) {
        echo "User is NOT authenticated\n";
        echo "Response status: " . $response->status() . "\n";
        echo "Response headers: " . json_encode($response->headers->all()) . "\n";
        echo "Session errors: " . json_encode(session('errors')) . "\n";
    }
    
    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));
});