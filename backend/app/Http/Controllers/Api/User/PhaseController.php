<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use Illuminate\Http\Request;

class PhaseController extends Controller
{
    public function addProfile(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'profile_id' => 'required'
        ]);

        $profileId = $request->profile_id;

        if (Profile::where('id', $profileId)->doesntExist()) {
            return response(['message' => 'Profile id dows not exists.'], 400);
        }

        $profile = Profile::create([
            'name' => $request->name,
            'description' => $request->description,
            'profile_id' => $request->profile_id,
        ]);

        return response(['message' => 'Phase succesfully created'], 200);
    }
}
