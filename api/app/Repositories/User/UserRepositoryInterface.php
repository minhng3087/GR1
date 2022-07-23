<?php

namespace App\Repositories\User;

use App\Repositories\RepositoryInterface;

interface UserRepositoryInterface extends RepositoryInterface
{
    public function getEventsAssign($id);

    public function getEventsByUser($id);

    public function getEventsByUserOrder($id);

    public function getListUsersNotMe($id);

    public function createEventAssign($attributes = []);
}
