<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\Component;
use App\Models\Composition;
use App\Models\Phase;
use App\Models\Profile;
use App\Models\Property;
use App\Models\Recipe;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{

    public function update(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
        ]);
        if (User::where('id', $request->id)->doesntExist()) {
            return response(['message' => 'User id dows not exists.'], 400);
        }

        $id = $request->id;

        $user = DB::table('users')
            ->where('id', $id)
            ->update([
                'name' => $request->name,
                'email' => $request->email
            ]);

        $currentUser = User::where('id', $id)->get()->first();

        return response(['message' => 'User succesfully updated', 'data' => $currentUser], 200);
    }

    public function delete($id)
    {
        $profiles = Profile::where('user_id', $id)->get();

        foreach ($profiles as $profile) {
            Phase::where('profile_id', $profile->id)->delete();
            Component::where('profile_id', $profile->id)->delete();
            Property::where('profile_id', $profile->id)->delete();
            Recipe::where('profile_id', $profile->id)->delete();
            Composition::where('profile_id', $profile->id)->delete();
        }

        Profile::where('user_id', $id)->delete();
        User::where('id', $id)->delete();

        return response(['message' => 'Profiles and user successfully deleted'], 200);
    }
}
