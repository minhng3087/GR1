<?php

namespace App\Repositories\User;

use App\Repositories\BaseRepository;

class UserRepository extends BaseRepository implements UserRepositoryInterface
{
    public function getModel()
    {
        return \App\Models\User::class;
    }

    public function getEventsAssign($id)
    {
        return $this->model->with('eventsAssign')->findOrFail($id);
    }

    public function getEventsByUser($id)
    {
        return $this->model->with('events')->findOrFail($id);
    }

    public function getEventsByUserOrder($id)
    {
        return $this->model->with(['events' => function ($q) {
            $q->orderBy('priority', 'DESC');
        }])->findOrFail($id);
    }

    public function getListUsersNotMe($id)
    {
        return $this->model->where('id', '!=', $id)->get(['id', 'name']);
    }

    public function createEventAssign($attributes = [])
    {
        return $this->model->eventsAssign()->attach($attributes);
    }
}
