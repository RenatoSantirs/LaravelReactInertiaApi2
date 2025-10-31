<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Laravel\Sanctum\PersonalAccessToken;

class ListActiveUsers extends Command
{
    // Aquí defines el nombre del comando que usarás en terminal
    protected $signature = 'users:active';

    // Descripción que aparece en "php artisan list"
    protected $description = 'Lista usuarios con tokens activos (logueados en la API)';

    public function handle()
    {
        $tokens = PersonalAccessToken::with('tokenable')->get();

        if ($tokens->isEmpty()) {
            $this->warn("No hay usuarios conectados (sin tokens activos).");
            return;
        }

        foreach ($tokens as $token) {
            $this->info(
                "Usuario: {$token->tokenable->email} | ".
                "Token ID: {$token->id} | ".
                "Último uso: ".($token->last_used_at ?? 'Nunca')
            );
        }
    }
}