<?php

use App\Http\Controllers\Admin\OrderReturnApprovalController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\FoodController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\StoreController;
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

    Route::resource('foods', FoodController::class);

    Route::resource('streams', StreamController::class);
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';


use App\Http\Controllers\PaymentController;
use App\Http\Controllers\WebhookController;

Route::post('/products/{product}/pay', [PaymentController::class, 'createPreference']);

Route::post('/webhook/mercadopago', [WebhookController::class, 'webhook']);



Route::middleware(['auth'])->group(function () {
    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
    Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
    Route::delete('/cart/{product}', [CartController::class, 'destroy'])->name('cart.destroy');
});


Route::get('/checkout', [CheckoutController::class, 'checkout'])
    ->middleware('auth')
    ->name('checkout');

Route::get('/inicio', [StoreController::class, 'index'])
    ->name('store.index');

Route::get('/store/products/{product}', [StoreController::class, 'show'])
    ->name('store.show');

Route::get('/checkout/success', [CheckoutController::class, 'success'])
    ->name('checkout.success');

Route::middleware(['auth'])->group(function () {

    Route::get('/orders', [OrderController::class, 'index'])
        ->name('orders.index');

    Route::get('/orders/{order}', [OrderController::class, 'show'])
        ->name('orders.show');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/mis-compras', [OrderController::class, 'misCompras'])
        ->name('orders.mis-compras');

    Route::get('/mis-compras/{order}', [OrderController::class, 'show'])
        ->name('orders.show');
});

use App\Http\Controllers\OrderItemReturnController;

Route::post(
    '/order-items/{item}/return',
    [OrderItemReturnController::class, 'store']
)->middleware('auth');
use App\Models\OrderItemReturn;

Route::get('/returns', function () {
    return inertia('Returns/Index', [
        'returns' => OrderItemReturn::with([
            'orderItem',
            'orderItem.product',
            'orderItem.order',
            'user',
        ])->latest()->get(),
    ]);
})->middleware('auth');


Route::post(
    '/admin/returns/{return}/approve',
    [OrderReturnApprovalController::class, 'approve']
)->name('admin.returns.approve');