<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

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

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::resource('/events', EventController::class);
    Route::group(['prefix' => 'user/{id}'], function () {
        Route::get('/events', [UserController::class, 'getEventsByUser']);
        Route::get('/events-order', [UserController::class, 'getEventsByUserOrder']);
        Route::get('/notifications', [NotificationController::class, 'index']);
        Route::get('/not-me', [UserController::class, 'getListUsersNotMe']);
    });
});
