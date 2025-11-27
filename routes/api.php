<?php

use App\Http\Controllers\Api\ContactApiController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\StreamApiController;
use App\Http\Controllers\Api\FoodApiController;
use Illuminate\Http\Request;

// Route::middleware('auth:sanctum')->apiResource('contacts', ContactApiController::class);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/contacts', [ContactApiController::class, 'index'])
        ->middleware('permission:view contacts');

    Route::get('/contacts/{contact}', [ContactApiController::class, 'show'])
        ->middleware('permission:view contacts');

    Route::post('/contacts', [ContactApiController::class, 'store'])
        ->middleware('permission:create contacts');

    Route::put('/contacts/{contact}', [ContactApiController::class, 'update'])
        ->middleware('permission:edit contacts');

    Route::delete('/contacts/{contact}', [ContactApiController::class, 'destroy'])
        ->middleware('permission:delete contacts');
});


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('/logout-all', [AuthController::class, 'logoutAll'])->middleware('auth:sanctum');


Route::apiResource('/streams', StreamApiController::class);
Route::apiResource('foods', FoodApiController::class);

Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return response()->json($request->user());
});
