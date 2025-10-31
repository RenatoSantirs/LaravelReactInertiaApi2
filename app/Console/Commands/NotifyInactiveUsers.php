<?php

// namespace App\Console\Commands;

// use Illuminate\Console\Command;
// use Laravel\Sanctum\PersonalAccessToken;
// use Carbon\Carbon;

// class NotifyInactiveUsers extends Command
// {
//     protected $signature = 'users:notify-inactive';
//     protected $description = 'Detecta usuarios inactivos (sin usar la API en 3 días)';

//     public function handle()
//     {
//         $threshold = now()->subDays(3);

//         $inactiveTokens = PersonalAccessToken::with('tokenable')
//             ->where(function ($q) use ($threshold) {
//                 $q->whereNull('last_used_at')
//                   ->orWhere('last_used_at', '<', $threshold);
//             })
//             ->get();

//         if ($inactiveTokens->isEmpty()) {
//             $this->info("No hay usuarios inactivos.");
//             return;
//         }

//         foreach ($inactiveTokens as $token) {
//             $user = $token->tokenable;
//             $this->warn("Usuario inactivo: {$user->email} | Último uso: {$token->last_used_at}");
//         }
//     }
// }
