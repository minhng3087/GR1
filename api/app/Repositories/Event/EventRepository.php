<?php

namespace App\Repositories\Event;

use App\Models\Comment;
use App\Models\Event;
use App\Models\User;
use App\Notifications\UserAssignNotification;
use App\Repositories\BaseRepository;
use Auth;
use Notification;

class EventRepository extends BaseRepository implements EventRepositoryInterface
{
    public function getModel()
    {
        return Event::class;
    }

    public function createNewEvent($attributes = [])
    {
        $event = $this->model->create($attributes);
        $event->usersAssign()->attach($attributes['user_assigned']);
        $users = User::whereIn('id', $attributes['user_assigned'])->get();
        Notification::send($users, new UserAssignNotification(Auth::user(), $event));
    }

    public function showEvent($id)
    {
        return $event = $this->model->with('usersAssign:id')->find($id);
    }

    public function editEvent($id, $attributes = [])
    {
        $event = $this->model->findOrFail($id);
        $event->update($attributes);
        if (! empty($attributes['user_assigned'])) {
            $event->usersAssign()->sync($attributes['user_assigned']);
            $users = User::whereIn('id', $attributes['user_assigned'])->get();
            Notification::send($users, new UserAssignNotification(Auth::user(), $event));
        }
    }

    public function getAllComments($id)
    {
        $comments = $this->model
                    ->with('comments.user:id,name')
                    ->findOrFail($id, ['id', 'title']);

        return $comments;
    }

    public function saveComment($attributes = [])
    {
        $event = $this->model->findOrFail($attributes['event_id']);
        $comment = new Comment;
        $comment->user_id = Auth::user()->id;
        $comment->parent_id = $attributes['parent_id'] ?? null;
        $comment->body = $attributes['body'];
        $event->comments()->save($comment);
    }
}
