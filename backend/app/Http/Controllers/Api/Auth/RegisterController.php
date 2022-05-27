<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class RegisterController extends Controller
{
    public function register (Request $request) {
        $this->validate($request, [
            'name' => 'required',
            'email' => 'required|unique:users',
            'password' => 'required|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'profiles' => [],
        ]);

        Mail::send('mail.register', ['name' => $request->name], function ($message) use ($request) {
            $message->to($request->email);
            $message->subject('Bienvenido/a a Mesta');
        });

        return response(['message' => 'User succesfully registered'], 200);
    }
}
