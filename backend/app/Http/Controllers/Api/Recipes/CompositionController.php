<?php

namespace App\Http\Controllers\Api\Recipes;

use App\Http\Controllers\Controller;
use App\Models\Composition;
use App\Models\Profile;
use App\Models\Recipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CompositionController extends Controller
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

        $data = Composition::where($formatQuery)->get();
        return response(['message' => 'Compositions successfully retrieved', 'items' => $data], 200);
    }
    public function create(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'profile_id' => 'required',
            'phases_percentage' => 'required',
        ]);

        $profileId = $request->profile_id;

        if (Profile::where('id', $profileId)->doesntExist()) {
            return response(['message' => 'Profile id dows not exists.'], 400);
        }

        $item = Composition::create([
            'name' => $request->name,
            'profile_id' => $request->profile_id,
            'phases_percentage' => $request->phases_percentage,
        ]);


        return response(['message' => 'Compositions succesfully created', 'data' => $item], 200);
    }

    public function update(Request $request)
    {

        $this->validate($request, [
            'id' => 'required',
        ]);

        if (Composition::where('id', $request->id)->doesntExist()) {
            return response(['message' => 'Composition id dows not exists.'], 400);
        }

        $id = $request->id;

        $property = DB::table('compositions')
            ->where('id', $id)
            ->update([
                'name' => $request->name,
                'profile_id' => $request->profile_id,
                'phases_percentage' => $request->phases_percentage,
            ]);
        $current = Composition::where('id', $id)->get()->first();

        return response(['message' => 'Composition succesfully updated', 'data' => $current], 200);
    }

    public function delete($id)
    {
        $recipesWithComposition = Recipe::where('composition_id', '=', $id)->get();
        foreach ($recipesWithComposition as $recipe) {
            Recipe::where('id', $recipe->id)->delete();
        }
        $item = Composition::where('id', $id)->delete();
        return response(['message' => 'Composition succesfully deleted'], 200);
    }
}
