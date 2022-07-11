<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Event;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        User::factory()->count(7)
        ->create()
        ->each(function(User $category) {
            Event::factory()->count(10)
                ->create([
                    'user_id' => $category->id,
                ]);
        });
    }
}
