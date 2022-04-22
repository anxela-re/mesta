<?php

namespace App\Http\Controllers\Api\Recipes;

use App\Http\Controllers\Controller;
use App\Models\Component;
use App\Models\Phase;
use App\Models\Profile;
use Illuminate\Http\Request;

class ComponentController extends Controller
{
    public function get(Request $request)
    {
        $query = $request->query();
        $formatQuery = [];

        foreach ($query as $key => $value) {
            if ($key === 'name') {
                array_push($formatQuery, [$key, 'like', $value]);
            } else {
                array_push($formatQuery, [$key, '=', $value]);
            }
        }

        $data = Component::where($formatQuery)->get();
        return response(['message' => 'Components successfully retrieved', 'items' => $data], 200);
    }
    public function create(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'profile_id' => 'required',
            'phase_id' => 'required'
        ]);

        $profileId = $request->profile_id;

        if (Profile::where('id', $profileId)->doesntExist()) {
            return response(['message' => 'Profile id dows not exists.'], 400);
        }

        $phaseId = $request->phase_id;

        if (Phase::where('id', $phaseId)->doesntExist()) {
            return response(['message' => 'Phase id dows not exists.'], 400);
        }

        $component = Component::create([
            'name' => $request->name,
            'description' => $request->description,
            'image_url' => $request->image_url,
            'expiration_date' => $request->expiration_date,
            'profile_id' => $request->profile_id,
            'phase_id' => $request->phase_id,
            'properties' => $request->properties,
        ]);

        return response(['message' => 'Component succesfully created', 'data' => $component], 200);
    }
}
