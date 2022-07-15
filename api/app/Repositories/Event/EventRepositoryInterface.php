<?php

namespace App\Repositories\Event;

use App\Repositories\RepositoryInterface;

interface EventRepositoryInterface extends RepositoryInterface
{
    public function getEventsByUser($id);
    public function getEventsByUserOrder($id);
}