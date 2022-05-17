<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Profile>
 */
class ProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $profileTopics = ['Cabello', 'Cuerpo', 'Cara'];
        return [
            'name' => $profileTopics[random_int(0, 2)],
            'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean condimentum suscipit tortor, non laoreet neque condimentum eu. Maecenas at sodales purus. Sed vel varius risus, sed ultrices felis. Duis finibus varius fermentum. In congue odio non sem laoreet, sed auctor lorem porttitor. Suspendisse venenatis ante leo, id eleifend elit lacinia id. Morbi eleifend, enim gravida facilisis interdum, mauris dolor consequat eros, aliquet lobortis orci libero ut lectus. Nunc eu cursus mi, et tristique metus. Vestibulum ante lacus, iaculis id elit non, placerat maximus dui. Etiam eget leo nibh.',
            'user_id' => User::inRandomOrder()->first()->id,
        ];
    }
}
