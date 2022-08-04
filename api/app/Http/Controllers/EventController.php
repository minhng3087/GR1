<?php

namespace App\Http\Controllers;

use App\Http\Requests\EventRequest;
use App\Repositories\Event\EventRepositoryInterface;
use DB;
use Illuminate\Http\Request;

class EventController extends Controller
{
    private EventRepositoryInterface $eventRepository;

    public function __construct(EventRepositoryInterface $eventRepository)
    {
        $this->eventRepository = $eventRepository;
    }

    public function index()
    {
        return response()->json(
           $this->eventRepository->getAll()
        );
    }

    public function getAllComments($id)
    {
        return $this->eventRepository->getAllComments($id);
    }

    public function store(EventRequest $request)
    {
        try {
            $this->eventRepository->createNewEvent($request->validated());

            return response()->json([
                'message' => 'Create Successfully',
            ], 200);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function show($id)
    {
        return response()->json($this->eventRepository->showEvent($id));
    }

    public function edit($id)
    {
        //
    }

    public function update(EventRequest $request, $id)
    {
        try {
            $this->eventRepository->editEvent($id, $request->validated());

            return response()->json([
                'message' => 'Edit Successfully',
            ], 200);
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function destroy($id)
    {
        $this->eventRepository->delete($id);

        return response()->json([
            'message' => 'Delete Successfully',
        ]);
    }

    public function saveComment(Request $request)
    {
        DB::beginTransaction();
        try {
            $this->eventRepository->saveComment($request->all());
            DB::commit();

            return response()->json([
                'message' => 'Save comment successfully',
            ], 200);
        } catch (\Exception $e) {
            DB::rollback();
        }
    }
}
