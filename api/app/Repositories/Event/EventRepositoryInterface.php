<?php

namespace App\Repositories\Event;

use App\Repositories\RepositoryInterface;

interface EventRepositoryInterface extends RepositoryInterface
{
    public function createNewEvent($attributes = []);

    public function showEvent($id);

    public function editEvent($id, $attributes = []);
}
