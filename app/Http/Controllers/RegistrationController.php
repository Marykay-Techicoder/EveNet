<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Registration;
use Illuminate\Support\Str;
use App\Http\Requests\StoreRegistrationRequest;

class RegistrationController extends Controller
{
    public function store(StoreRegistrationRequest $request)
    {
        $event = Event::findOrFail($request->event_id);

        // Prevent duplicate registration
        $existingRegistration = Registration::where('event_id', '=', $event->id)
            ->where('email', '=', $request->email)
            ->first();

        if ($existingRegistration) {

            return response()->json([
                'message' => 'You have already registered for this event.'
            ], 422);
        }

        $request->validate([
            'event_id' => 'required|exists:events,id',
            'full_name' => 'required|min:3|max:255',
            'email' => 'required|email',
            'phone' => 'required|min:10|max:20',
            'location' => 'required',
            'referral_source' => 'required',
            'expectation' => 'required|min:10',
            'photo' => 'nullable|image|mimes:jpg,jpeg,png|max:5120',
        ]);
        // Capacity validation
        if (
            $event->capacity &&
            $event->registrations()->count() >= $event->capacity
        ) {

            return response()->json([
                'message' => 'Event capacity reached.'
            ], 422);
        }

        $ticketCode = strtoupper(Str::random(3)) . '-' . $event->id . '-' . Str::random(5);

        $registration = Registration::create([
            'event_id' => $event->id,
            'full_name' => $request->full_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'location' => $request->location,
            'referral_source' => $request->referral_source,
            'expectation' => $request->expectation,
            'ticket_code' => $ticketCode,
        ]);
        return redirect()->back()->with('success', 'Successfully registered for this event, your ticket code is: ' . $ticketCode . 'Your digital ticket will be sent to your email');
    }
}
