<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Http\Controllers\Api\Auth\AuthenticationController;
use App\Http\Controllers\Api\Auth\ForgotPassController;
use App\Http\Controllers\Api\Auth\RegisterController;
use App\Http\Controllers\Api\User\PhaseController;
use App\Http\Controllers\Api\User\ProfileController;
use App\Http\Controllers\Api\User\UserController;
use App\Models\Phase;
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
Route::middleware('auth:api')->put('/user', [UserController::class, 'update']);
Route::delete('/user/{id}', function ($id) {
    $profiles = Profile::where('user_id', $id)->delete();
    $user = User::where('id', $id)->delete();
    return response(['message' => 'Profiles and user successfully deleted'], 200);
});


Route::group(['namespace' => 'Api\Auth'], function () {
    Route::post('/login', [AuthenticationController::class, 'login']);
    Route::post('/logout', [AuthenticationController::class, 'logout'])->middleware(('auth:api'));
    Route::post('/register', [RegisterController::class, 'register']);
    Route::post('/forgot', [ForgotPassController::class, 'forgot']);
    Route::post('/reset', [ForgotPassController::class, 'reset']);
});

Route::group(['namespace' => 'Api\User'], function () {
    // Profiles 
    Route::get('/profiles/{id}', function ($id) {
        $profiles = Profile::where('user_id', $id)->get();
        return $profiles;
    })->middleware(('auth:api'));
    Route::post('/profile', [ProfileController::class, 'addProfile'])->middleware(('auth:api'));
    Route::put('/profile', [ProfileController::class, 'updateProfile'])->middleware((('auth:api')));
    Route::delete('/profile/{id}', function ($id) {
        $phases = Phase::where('profile_id', $id)->delete();
        $profiles = Profile::where('id', $id)->delete();
        return response(['message' => 'Profile succesfully deleted'], 200);
    })->middleware((('auth:api')));

    // Phases
    Route::get('/phases/{id}', function ($id) {
        $phases = Phase::where('profile_id', $id)->get();
        return $phases;
    });
    Route::post('/phase', [PhaseController::class, 'addPhase'])->middleware(('auth:api'));
    Route::put('/phase', [PhaseController::class, 'updatePhase'])->middleware(('auth:api'));
    Route::delete('/phase/{id}', function ($id) {
        $phase = Phase::where('id', $id)->delete();
        return response(['message' => 'Phase succesfully deleted'], 200);
    })->middleware(('auth:api'));
});
