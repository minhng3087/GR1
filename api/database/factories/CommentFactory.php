<?php

namespace Database\Factories;

use App\Models\Event;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $commentable = $this->commentable();

        return [
            'user_id' => User::all()->random()->id,
            'body' => $this->faker->paragraph,
            'commentable_id' => $commentable::factory(),
            'commentable_type' => $commentable,
        ];
    }

    public function commentable()
    {
        return $this->faker->randomElement([
            Event::class,
        ]);
    }
}
