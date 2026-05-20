<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{

public function run(): void
{
    Category::create([
        'name' => 'Technology',
        'slug' => 'technology'
    ]);

    Category::create([
        'name' => 'Business',
        'slug' => 'business'
    ]);

    Category::create([
        'name' => 'Workshop',
        'slug' => 'workshop'
    ]);

    Category::create([
        'name' => 'Conference',
        'slug' => 'conference'
    ]);
}
}
