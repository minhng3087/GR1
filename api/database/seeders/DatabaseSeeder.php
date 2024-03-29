<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Event;
use App\Models\User;
use Illuminate\Database\Seeder;

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
        // User::factory()->count(7)
        // ->create()
        // ->each(function (User $user) {
        //     Event::factory()->count(10)
        //         ->create([
        //             'user_id' => $user->id,
        //         ]);
        // });

        User::factory(7)->create();
        Event::factory(30)->create();

        Comment::factory(5)->create();
    }
}
