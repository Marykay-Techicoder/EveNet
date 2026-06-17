<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Events\Login;
use Illuminate\Auth\Events\Logout;

class EventServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
        Event::listen(Login::class, function ($event) {

            logActivity(
                'login',
                'Admin logged in'
            );
        });

        Event::listen(Logout::class, function ($event) {

            logActivity(
                'logout',
                'Admin logged out'
            );
        });
    }
}
