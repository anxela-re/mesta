<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\Component;
use App\Models\Composition;
use App\Models\Phase;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PhaseController extends Controller
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

        $data = Phase::where($formatQuery)->get();
        return response(['message' => 'Phases successfully retrieved', 'items' => $data], 200);
    }
    public function create(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'color' => 'required',
            'profile_id' => 'required'
        ]);


        $profileId = $request->profile_id;

        if (Profile::where('id', $profileId)->doesntExist()) {
            return response(['message' => 'Profile id does not exists.'], 400);
        }

        $phase = Phase::create([
            'name' => $request->name,
            'description' => $request->description,
            'color' => $request->color,
            'profile_id' => $request->profile_id,
        ]);

        return response(['message' => 'Phase succesfully created', 'data' => $phase], 200);
    }

    public function update(Request $request)
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
        $current = Phase::where('id', $id)->get()->first();

        return response(['message' => 'Phase succesfully updated', 'data' => $current], 200);
    }
    public function delete($id)
    {


        $components = Component::where('phase_id', '=', $id)->delete();
        $compositions = Composition::where('phases_id', 'like', '%' . $id . '%')->get();

        foreach ($compositions as $composition) {
            $compositionsWithPhasePercentage = $composition->phases_percentage;
            $compositionsId = $composition->phases_id;
            $newCompositionsWithPhasePercentage = array_values(array_filter($compositionsWithPhasePercentage, function ($v) use ($id) {
                return $v['phase_id'] !== (int)$id;
            }));
            $newCompositionsId = array_values(array_filter($compositionsId, function ($var) use ($id) {
                return $var !== (int)$id;
            }));

            DB::table('compositions')
                ->where('id', $composition->id)
                ->update([
                    'phases_percentage' => $newCompositionsWithPhasePercentage,
                    'phases_id' => $newCompositionsId,
                ]);
        }

        $phase = Phase::where('id', $id)->delete();
        return response(['message' => 'Phase succesfully deleted'], 200);
    }
}
