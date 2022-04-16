<?php

namespace App\Http\Controllers\Api\Recipes;

use App\Http\Controllers\Controller;
use App\Models\Component;
use App\Models\Phase;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ComponentController extends Controller
{
    public function create(Request $request)
    {

        $this->validate($request, [
            'name' => 'required|unique:components',
            'profile_id' => 'required',
            'phase_id' => 'required',
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
            'profile_id' => $request->profile_id,
            'phase_id' => $request->phase_id,
            'description' => $request->description || null,
            'image_url' => $request->image_url || null,
            'properties' => $request->properties || [],
        ]);


        return response(['message' => 'Component succesfully created', 'data' => $component], 200);
    }
    public function update(Request $request)
    {

        $this->validate($request, [
            'id' => 'required',
        ]);

        if (Component::where('id', $request->id)->doesntExist()) {
            return response(['message' => 'Component id dows not exists.'], 400);
        }

        $id = $request->id;

        $component = DB::table('components')
            ->where('id', $id)
            ->update([
                'name' => $request->name,
                'profile_id' => $request->profile_id,
                'phase_id' => $request->phase_id,
                'description' => $request->description,
                'image_url' => $request->image_url,
                'properties' => $request->properties,
            ]);

        $current = Component::where('id', $id)->get()->first();
        return response(['message' => 'Componentesuccessfully updated', 200]);


        return response(['message' => 'Component succesfully created', 'data' => $component], 200);
    }
}
