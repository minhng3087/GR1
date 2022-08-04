<?php

namespace Database\Factories;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $year = rand(2021, 2022);
        $month = rand(1, 12);
        $day = rand(1, 28);
        $hour = rand(1, 12);
        $minute = rand(1, 59);
        $second = rand(1, 59);
        $date = Carbon::create($year, $month, $day, $hour, $minute, $second);

        return [
            'title' => $this->faker->name,
            'start' => $date->format('Y-m-d H:i:s'),
            'end' => $date->addWeeks(rand(1, 52))->format('Y-m-d H:i:s'),
            'address' => $this->faker->address,
            'priority' => $this->faker->numberBetween(1, 3),
            'user_id' => User::all()->random()->id,
        ];
    }
}
