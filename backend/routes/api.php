<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\AuthenticationController;
use App\Http\Controllers\Api\Auth\ForgotPassController;
use App\Http\Controllers\Api\Auth\RegisterController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\Recipes\ComponentController;
use App\Http\Controllers\Api\Recipes\CompositionController;
use App\Http\Controllers\Api\Recipes\PropertyController;
use App\Http\Controllers\Api\Recipes\RecipeController;
use App\Http\Controllers\Api\User\PhaseController;
use App\Http\Controllers\Api\User\ProfileController;
use App\Http\Controllers\Api\User\UserController;

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

Route::post('/contact',  [ContactController::class, 'contact']);

Route::group(['namespace' => 'Api\Auth'], function () {
    Route::post('/login', [AuthenticationController::class, 'login']);
    Route::post('/logout', [AuthenticationController::class, 'logout'])->middleware(('auth:api'));
    Route::post('/register', [RegisterController::class, 'register']);
    Route::post('/forgot', [ForgotPassController::class, 'forgot']);
    Route::post('/reset', [ForgotPassController::class, 'reset']);
});

Route::middleware(('auth:api'))->group(function () {
    // Users
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::put('/user', [UserController::class, 'update']);
    Route::delete('/user/{id}', [UserController::class, 'delete']);

    // Profiles 
    Route::get('/profiles', [ProfileController::class, 'get']);
    Route::post('/profile', [ProfileController::class, 'create']);
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::delete('/profile/{id}', [ProfileController::class, 'delete']);

    // Phases
    Route::get('/phases', [PhaseController::class, 'get']);
    Route::post('/phase', [PhaseController::class, 'create']);
    Route::put('/phase', [PhaseController::class, 'update']);
    Route::delete('/phase/{id}', [PhaseController::class, 'delete']);

    // Properties
    Route::get('/properties', [PropertyController::class, 'get']);
    Route::post('/property', [PropertyController::class, 'create']);
    Route::put('/property', [PropertyController::class, 'update']);
    Route::delete('/property/{id}', [PropertyController::class, 'delete']);

    // Components
    Route::get('/components', [ComponentController::class, 'get']);
    Route::post('/component', [ComponentController::class, 'create']);
    Route::put('/component', [ComponentController::class, 'update']);
    Route::delete('/component/{id}', [ComponentController::class, 'delete']);

    // Compositions
    Route::get('/compositions', [CompositionController::class, 'get']);
    Route::post('/compositions', [CompositionController::class, 'create']);
    Route::put('/compositions', [CompositionController::class, 'update']);
    Route::delete('/compositions/{id}', [CompositionController::class, 'delete']);

    // Recipes
    Route::get('/recipes', [RecipeController::class, 'get']);
    Route::post('/recipes', [RecipeController::class, 'create']);
    Route::put('/recipes', [RecipeController::class, 'update']);
    Route::delete('/recipes/{id}', [RecipeController::class, 'delete']);
});
