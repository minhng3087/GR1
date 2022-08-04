<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'start', 'end', 'user_id', 'address', 'priority'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function usersAssign()
    {
        return $this->belongsToMany(User::class, 'assignments', 'event_id', 'user_id')->withTimestamps();
    }

    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}
