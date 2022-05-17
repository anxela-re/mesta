<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;


class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@mail.com',
            'password' => bcrypt('admin')
        ]);
        User::create([
            'name' => 'Claudia Marta',
            'email' => 'claudia.marta@mail.com',
            'password' => bcrypt('claudiamarta')
        ]);
        User::create([
            'name' => 'Xoan Puime',
            'email' => 'xoan.puime@mail.com',
            'password' => bcrypt('xoanpuime')
        ]);

        // User::factory(5)->create();
    }
}
