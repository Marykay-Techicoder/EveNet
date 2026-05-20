<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreEventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
       return [
    'category_id' => ['required'],
    'title' => ['required', 'max:255'],
    'description' => ['required'],
    'event_mode' => ['required'],
    'location' => ['required_if:event_mode,offline'],
    'meeting_link' => ['required_if:event_mode,online'],
    'start_date' => ['required'],
    'end_date' => ['required'],
    'start_time' => ['required'],
    'end_time' => ['required'],
];
    }
}
