<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    public function category()
{
    return $this->belongsTo(Category::class);
}

public function user()
{
    return $this->belongsTo(User::class);
}
protected $fillable = [
    'category_id',
    'user_id',
    'title',
    'slug',
    'description',
    'event_mode',
    'location',
    'meeting_link',
    'start_date',
    'end_date',
    'start_time',
    'end_time',
    'capacity',
    'flyer',
    'is_published'
];

public function registrations ()
{
    return $this->hasMany(Registration::class);
}
}



