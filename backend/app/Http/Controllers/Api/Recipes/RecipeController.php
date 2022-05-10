<?php

namespace App\Http\Controllers\Api\Recipes;

use App\Http\Controllers\Controller;
use App\Models\Composition;
use App\Models\Profile;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RecipeController extends Controller
{
    public function get(Request $request)
    {
        $query = $request->query();
        $formatQuery = [];

        foreach ($query as $key => $value) {
            if ($key === 'name') {
                array_push($formatQuery, [$key, 'like', '%' . $value . '%']);
            } else if ($key === 'properties') {
                $propertiesIds = explode(',', $value);
                foreach ($propertiesIds as $pKey => $pValue) {
                    array_push($formatQuery, [$key, 'like', '%' . $pValue . '%']);
                }
            } else {
                array_push($formatQuery, [$key, '=', $value]);
            }
        }

        $data = Recipe::where($formatQuery)->get();
        return response(['message' => 'Recipes successfully retrieved', 'items' => $data], 200);
    }
    public function create(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'profile_id' => 'required',
            'components' => 'required',
            'composition_id' => 'required',
        ]);

        $profileId = $request->profile_id;

        if (Profile::where('id', $profileId)->doesntExist()) {
            return response(['message' => 'Profile id dows not exists.'], 400);
        }

        $compositionId = $request->composition_id;

        if (Composition::where('id', $compositionId)->doesntExist()) {
            return response(['message' => 'Composition id dows not exists.'], 400);
        }

        $item = Recipe::create([
            'name' => $request->name,
            'description' => $request->description,
            'profile_id' => $request->profile_id,
            'composition_id' => $request->composition_id,
            'components' => $request->components,
            'properties' => $request->properties,
        ]);


        return response(['message' => 'Recipe succesfully created', 'data' => $item], 200);
    }
    public function update(Request $request)
    {

        $this->validate($request, [
            'id' => 'required',
        ]);

        if (Recipe::where('id', $request->id)->doesntExist()) {
            return response(['message' => 'Recipe id dows not exists.'], 400);
        }

        $id = $request->id;

        $item = DB::table('recipes')
            ->where('id', $id)
            ->update([
                'name' => $request->name,
                'description' => $request->description,
                'profile_id' => $request->profile_id,
                'composition_id' => $request->composition_id,
                'components' => $request->components,
                'properties' => $request->properties,
            ]);
        $current = Recipe::where('id', $id)->get()->first();

        return response(['message' => 'Recipe succesfully updated', 'data' => $current], 200);
    }
    public function delete($id)
    {
        $item = Recipe::where('id', $id)->delete();
        return response(['message' => 'Recipe succesfully deleted'], 200);
    }
}
