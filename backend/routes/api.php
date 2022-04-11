<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Http\Controllers\Api\Auth\AuthenticationController;
use App\Http\Controllers\Api\Auth\ForgotPassController;
use App\Http\Controllers\Api\Auth\RegisterController;
use App\Http\Controllers\Api\User\ProfileController;
use App\Models\Profile;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group(['namespace' => 'Api\Auth'], function () {
    Route::post('/login', [AuthenticationController::class, 'login']);
    Route::post('/logout', [AuthenticationController::class, 'logout'])->middleware(('auth:api'));
    Route::post('/register', [RegisterController::class, 'register']);
    Route::post('/forgot', [ForgotPassController::class, 'forgot']);
    Route::post('/reset', [ForgotPassController::class, 'reset']);
});

Route::group(['namespace' => 'Api\User'], function () {
    Route::post('/profile', [ProfileController::class, 'addProfile'])->middleware(('auth:api'));
    Route::put('/profile', [ProfileController::class, 'updateProfile'])->middleware((('auth:api')));
    Route::get('/profiles/{id}', function ($id) {
        $profiles = Profile::where('user_id', $id)->get();
        return $profiles;
    })->middleware(('auth:api'));
});
