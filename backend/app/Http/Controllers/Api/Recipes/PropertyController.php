<?php

namespace App\Http\Controllers\Api\Recipes;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PropertyController extends Controller
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

        $data = Property::where($formatQuery)->get();
        return response(['message' => 'Proeprties successfully retrieved', 'items' => $data], 200);
    }
    public function create(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'profile_id' => 'required',
        ]);

        $profileId = $request->profile_id;

        if (Profile::where('id', $profileId)->doesntExist()) {
            return response(['message' => 'Profile id dows not exists.'], 400);
        }

        $property = Property::create([
            'name' => $request->name,
            'profile_id' => $request->profile_id,
        ]);


        return response(['message' => 'Property succesfully created', 'data' => $property], 200);
    }

    public function update(Request $request)
    {

        $this->validate($request, [
            'id' => 'required',
        ]);

        if (Property::where('id', $request->id)->doesntExist()) {
            return response(['message' => 'Property id dows not exists.'], 400);
        }

        $id = $request->id;

        $property = DB::table('properties')
            ->where('id', $id)
            ->update([
                'name' => $request->name,
                'profile_id' => $request->profile_id,
            ]);
        $current = Property::where('id', $id)->get()->first();

        return response(['message' => 'Property succesfully updated', 'data' => $current], 200);
    }

    public function delete($id)
    {
        $item = Property::where('id', $id)->delete();
        return response(['message' => 'Property succesfully deleted'], 200);
    }
}