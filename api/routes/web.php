<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventController;
use App\Http\Controllers\NotificationController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__.'/auth.php';

Route::group(['middleware' => 'auth'], function()
{
    Route::resource('/events', EventController::class);
    Route::get('/user/{id}/events', [EventController::class, 'getEventsByUser']);
    Route::get('/user/{id}/events-order', [EventController::class, 'getEventsByUserOrder']);
    Route::get('/test', [NotificationController::class, 'index']);
    Route::get('/user/{id}/notifications', [NotificationController::class, 'index']);
});