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
    public function get(Request $request)
    {
        $query = $request->query();
        $select = $request->query('select');
        $formatQuery = [];

        foreach ($query as $key => $value) {
            if ($key !== 'select') {
                if ($key === 'name') {
                    array_push($formatQuery, [$key, 'like', $value]);
                } else {
                    array_push($formatQuery, [$key, '=', $value]);
                }
            }
        }

        if ($select) {
            $selectValues = explode(',', $select);
            $data = Component::where($formatQuery)->select($selectValues)->get();
        } else {
            $data = Component::where($formatQuery)->get();
        }

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
            'scientific_name' => $request->scientific_name,
        ]);

        return response(['message' => 'Component succesfully created', 'data' => $component], 200);
    }
    public function update(Request $request)
    {

        $this->validate($request, [
            'id' => 'required',
            'profile_id' => 'required',
            'phase_id' => 'required'
        ]);

        if (Component::where('id', $request->id)->doesntExist()) {
            return response(['message' => 'Component id dows not exists.'], 400);
        }

        $id = $request->id;

        $component = DB::table('components')
            ->where('id', $id)
            ->update([
                'name' => $request->name,
                'description' => $request->description,
                'image_url' => $request->image_url,
                'expiration_date' => $request->expiration_date,
                'profile_id' => $request->profile_id,
                'phase_id' => $request->phase_id,
                'properties' => $request->properties,
                'scientific_name' => $request->scientific_name,
            ]);
        $current = Component::where('id', $id)->get()->first();

        return response(['message' => 'Component succesfully updated', 'data' => $current], 200);
    }
    public function delete($id)
    {
        $item = Component::where('id', $id)->delete();
        return response(['message' => 'Component succesfully deleted'], 200);
    }
}
