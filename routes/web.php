<?php


use App\Http\Controllers\ContactController;
use App\Http\Controllers\FoodController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\StreamController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'verified'])->group(function () {
    // 👑 Solo admin puede acceder a usuarios
    // Route::resource('users', UserController::class)->middleware('role:admin');
    Route::resource('users', UserController::class);

    // 👤 Los usuarios normales pueden manejar contactos según sus permisos
    Route::resource('contacts', ContactController::class);

    Route::resource('products', ProductController::class);

    Route::resource('foods',FoodController::class);

    Route::resource('streams',StreamController::class);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';


