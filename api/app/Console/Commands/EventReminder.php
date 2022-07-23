<?php

namespace App\Console\Commands;

use App\Models\Event;
use App\Notifications\EventReminderNotification;
use Illuminate\Console\Command;

class EventReminder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'users:event-reminder';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $events = Event::whereNotNull('end')->whereRaw(
            'TIMESTAMPDIFF(MINUTE, NOW(), end) <= 10 '
        )->whereRaw(
            'TIMESTAMPDIFF(MINUTE, NOW(), end) > 0 '
        )->with('user')->get();
        foreach ($events as $event) {
            $event->user->notify(new EventReminderNotification($event));
        }
    }
}
