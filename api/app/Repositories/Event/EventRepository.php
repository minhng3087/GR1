<?php

namespace App\Repositories\Event;

use App\Repositories\Event\EventRepositoryInterface;
use App\Repositories\BaseRepository;
use App\Models\User;
use App\Models\Event;

class EventRepository extends BaseRepository implements EventRepositoryInterface 
{
    public function getModel()
    {
        return Event::class;
    }
    public function getEventsByUser($id)
    {
        return User::with('events')->findOrFail($id);
    }
    public function getEventsByUserOrder($id)
    {
        return User::with(['events' => function ($q) {
            $q->orderBy('priority', 'DESC');
        }])->findOrFail($id);
    }
}