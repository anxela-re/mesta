<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProfileController extends Controller
{
    public function addProfile(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'user_id' => 'required'
        ]);

        $userId = $request->user_id;

        if (User::where('id', $userId)->doesntExist()) {
            return response(['message' => 'User id dows not exists.'], 400);
        }

        $profile = Profile::create([
            'name' => $request->name,
            'description' => $request->description || null,
            'user_id' => $request->user_id,
        ]);

        return response(['message' => 'Profile succesfully created', 'data' => $profile], 200);
    }

    public function updateProfile(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
        ]);

        if (Profile::where('id', $request->id)->doesntExist()) {
            return response(['message' => 'Profile id dows not exists.'], 400);
        }

        $profileId = $request->id;

        $profile = DB::table('profiles')
            ->where('id', $profileId)
            ->update([
                'name' => $request->name,
                'description' => $request->description
            ]);
        $currentProfile = Profile::where('id', $profileId)->get()->first();

        return response(['message' => 'Profile succesfully updated', 'data' => $currentProfile], 200);
    }
}
