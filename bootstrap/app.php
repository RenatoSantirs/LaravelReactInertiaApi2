<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use
    Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Console\Scheduling\Schedule;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use Spatie\Permission\Exceptions\UnauthorizedException;
use Spatie\Permission\Middleware\PermissionMiddleware;
use Spatie\Permission\Middleware\RoleMiddleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php', //api A
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);
        $middleware->api(prepend: [
            EnsureFrontendRequestsAreStateful::class,
        ]); //middleware de Sanctum A
        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
        $middleware->alias([
            'permission' => PermissionMiddleware::class,
            'role'       => RoleMiddleware::class,
        ]);
        $middleware->validateCsrfTokens(except: [
            'webhook/mercadopago',
        ]);
    })
    ->withSchedule(function (Schedule $schedule) {
        // Aquí programas tus comandos
        // $schedule->command('users:notify-inactive')->daily();
        // si quieres probar cada minuto mientras desarrollas:
        // $schedule->command('users:notify-inactive')->everyMinute();
    })  
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (UnauthorizedException $e, $request) {
            return response()->json([
                'message' => 'No tienes permiso para realizar esta acción'
            ], 403);
        });
    })->create();
