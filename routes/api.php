<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;

Route::get('/events', [EventController::class, 'index']);
Route::post('/admin/events', [EventController::class, 'store']);
Route::put('/admin/events/{event}', [EventController::class, 'update']);
Route::delete('/admin/events/{event}', [EventController::class, 'destroy']);