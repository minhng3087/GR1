<?php

namespace App\Http\Controllers;

use App\Repositories\User\UserRepositoryInterface;

class UserController extends Controller
{
    private UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function getEventsByUser($id)
    {
        $events = $this->userRepository->getEventsByUser($id)->events->toArray();
        $eventsAssign = $this->userRepository->getEventsAssign($id)->toArray()['events_assign'];
        if (! empty($eventsAssign)) {
            $events = array_merge($events, $eventsAssign);
        }

        return response()->json($events);
    }

    public function getEventsByUserOrder($id)
    {
        return response()->json($this->userRepository->getEventsByUserOrder($id));
    }

    public function getListUsersNotMe($id)
    {
        return response()->json($this->userRepository->getListUsersNotMe($id));
    }
}
