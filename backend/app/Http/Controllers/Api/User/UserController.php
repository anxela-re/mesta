<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{

    public function update(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
        ]);
        if (User::where('id', $request->id)->doesntExist()) {
            return response(['message' => 'User id dows not exists.'], 400);
        }

        $id = $request->id;

        $user = DB::table('users')
            ->where('id', $id)
            ->update([
                'name' => $request->name,
                'email' => $request->email
            ]);

        $currentUser = User::where('id', $id)->get()->first();

        return response(['message' => 'User succesfully updated', 'data' => $currentUser], 200);
    }
}
