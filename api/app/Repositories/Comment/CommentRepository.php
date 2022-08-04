<?php

namespace App\Repositories\Comment;

use App\Repositories\BaseRepository;

class CommentRepository extends BaseRepository implements CommentRepositoryInterface
{
    public function getModel()
    {
        return \App\Models\Comment::class;
    }

    public function getAllComments($id)
    {
        return $this->model->with('commentable')->findOrFail($id);
    }
}
