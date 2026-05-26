<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;
use App\Http\Controllers\RegistrationController;

/*
|--------------------------------------------------------------------------
| EVENTS
|--------------------------------------------------------------------------
*/

Route::get('/events', [EventController::class, 'index']);

Route::post('/admin/events', [EventController::class, 'store']);

Route::put('/admin/events/{event}', [EventController::class, 'update']);

Route::delete('/admin/events/{event}', [EventController::class, 'destroy']);

/*
|--------------------------------------------------------------------------
| EVENT REGISTRATION
|--------------------------------------------------------------------------
*/

