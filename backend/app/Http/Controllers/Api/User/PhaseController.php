<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\Phase;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PhaseController extends Controller
{
    public function addPhase(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'color' => 'required',
            'profile_id' => 'required'
        ]);


        $profileId = $request->profile_id;

        if (Profile::where('id', $profileId)->doesntExist()) {
            return response(['message' => 'Profile id dows not exists.'], 400);
        }

        $phase = Phase::create([
            'name' => $request->name,
            'description' => $request->description || null,
            'color' => $request->color,
            'profile_id' => $request->profile_id,
        ]);


        return response(['message' => 'Phase succesfully created', 'data' => $phase], 200);
    }

    public function updatePhase(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
        ]);

        if (Phase::where('id', $request->id)->doesntExist()) {
            return response(['message' => 'Phase id dows not exists.'], 400);
        }

        $id = $request->id;

        $phase = DB::table('phases')
            ->where('id', $id)
            ->update([
                'name' => $request->name,
                'description' => $request->description,
                'color' => $request->color,
                'profile_id' => $request->profile_id,
            ]);
        $current = Profile::where('id', $id)->get()->first();

        return response(['message' => 'Phase succesfully updated', 'data' => $current], 200);
    }
}
