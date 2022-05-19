<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class ForgotPassController extends Controller
{
    public function forgot(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email'
        ]);

        $email = $request->email;

        if (User::where('email', $email)->doesntExist()) {
            return response(['message' => 'El correo electrónico no existe.'], 400);
        }
        $token = Str::random(10);

        DB::table('password_resets')->insert([
            'email' => $email,
            'token' => $token,
            'created_at' => now()->addHours(6)
        ]);

        // Send email
        Mail::send('mail.password_reset', ['token' => $token], function ($message) use ($email) {
            $message->to($email);
            $message->subject('Restaurar contraseña');
        });

        return response(['message' => 'Compruebe su email'], 200);
    }

    public function reset(Request $request)
    {
        $this->validate($request, [
            'token' => 'required|string',
            'password' => 'required|string|confirmed',
        ]);

        $token = $request->token;
        $passwordRest = DB::table('password_resets')->where('token', $token)->first();

        if (!$passwordRest) {
            return response(['message' => 'No se encuentra el token'], 200);
        }
        if (!$passwordRest->created_at >= now()) {
            return response(['message' => 'El token ha expirado.'], 200);
        }

        $user = User::where('email', $passwordRest->email)->first();

        if (!$user) {
            return response(['message' => 'El usuario no existe'], 200);
        }

        $user->password = Hash::make($request->password);
        $user->save();

        DB::table('password_resets')->where('token', $token)->delete();

        return response(['message' => 'Contraseña resturada correctamente.'], 200);
    }
}
