<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function contact(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'body' => 'required',
            'name' => 'required'
        ]);

        // Send email
        Mail::send('mail.contact', [
            'email' => $request->email,
            'body' => $request->body,
            'name' => $request->name
        ], function ($message) {
            $message->to('mesta.formulacion@gmail.com');
            $message->subject('Contacto');
        });

        return response(['message' => 'Contacto realizado con éxito'], 200);
    }
}
