<?php

namespace Database\Seeders;

use App\Models\Profile;
use App\Models\User;
use Database\Factories\ProfileFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProfileTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Profile::factory(6)->create();
    }
}
