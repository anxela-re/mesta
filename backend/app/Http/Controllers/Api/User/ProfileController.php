<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\Phase;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProfileController extends Controller
{
    public function get(Request $request)
    {
        $query = $request->query();
        $formatQuery = [];

        foreach ($query as $key => $value) {
            if ($key === 'name') {
                array_push($formatQuery, [$key, 'like', '%' . $value . '%']);
            } else {
                array_push($formatQuery, [$key, '=', $value]);
            }
        }

        $data = Profile::where($formatQuery)->get();
        return response(['message' => 'Profiles successfully retrieved', 'items' => $data], 200);
    }

    public function create(Request $request)
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
            'description' => $request->description,
            'user_id' => $request->user_id,
        ]);

        return response(['message' => 'Profile succesfully created', 'data' => $profile], 200);
    }

    public function update(Request $request)
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

    public function delete($id)
    {
        $phases = Phase::where('profile_id', $id)->delete();
        $profiles = Profile::where('id', $id)->delete();
        return response(['message' => 'Profile succesfully deleted'], 200);
    }
}
