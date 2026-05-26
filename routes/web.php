<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\RegistrationController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Event;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

/*
|--------------------------------------------------------------------------
| FRONTEND PAGES
|--------------------------------------------------------------------------
*/

Route::get('/api/events', [EventController::class, 'index']); 
Route::post('/api/events', [EventController::class, 'store']);

Route::get('/events-page', function () {
    return Inertia::render('Events');
});

// Route::get('/event-registration', function () {
//     return Inertia::render('EventRegistration');
// });
// Route::get('/event-registration/{event}', function (\App\Models\Event $event) {
//     return Inertia::render('EventRegistration', [
//         'event' => $event
//     ]);
// });
Route::post('/register-event', [RegistrationController::class, 'store']);

Route::get('/event-registration/{event}', function (Event $event) {
    return Inertia::render('EventRegistration', [
        'event' => $event
    ]);
});

Route::get('/events/{id}', function ($id) {

    return Inertia::render('EventShow', [
        'eventId' => $id
    ]);

});

require __DIR__.'/auth.php';