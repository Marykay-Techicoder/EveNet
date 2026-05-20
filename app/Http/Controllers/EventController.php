<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Support\Str;
use App\Http\Requests\StoreEventRequest;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::with('category')
        ->latest()
        ->get();
        
        return response()->json($events);
    }

    public function store(StoreEventRequest $request)
{
    Event::create([

        'category_id' => $request->category_id,

        'user_id' => auth()->id(),

        'title' => $request->title,

        'slug' => Str::slug($request->title),

        'description' => $request->description,

        'event_mode' => $request->event_mode,

        'location' => $request->location,

        'meeting_link' => $request->meeting_link,

        'start_date' => $request->start_date,

        'end_date' => $request->end_date,

        'start_time' => $request->start_time,

        'end_time' => $request->end_time,

        'capacity' => $request->capacity,

        'is_published' => false,
    ]);

    return redirect()->back();
}
}
