<?php

namespace App\Http\Controllers;

use App\Repositories\Comment\CommentRepositoryInterface;

class CommentController extends Controller
{
    private CommentRepositoryInterface $commentRepository;

    public function __construct(CommentRepositoryInterface $commentRepository)
    {
        $this->commentRepository = $commentRepository;
    }

    public function getAllComments($id)
    {
        return $this->commentRepository->getAllComments($id);
    }
}
