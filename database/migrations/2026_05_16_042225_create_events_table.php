<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up(): void
{
    Schema::create('events', function (Blueprint $table) {

        $table->id();

        $table->foreignId('category_id')
            ->constrained()
            ->onDelete('cascade');

        $table->foreignId('user_id')
            ->constrained()
            ->onDelete('cascade');

        $table->string('title');

        $table->string('slug')->unique();

        $table->text('description');

        $table->enum('event_mode', [
            'physical',
            'online',
            'hybrid'
        ]);

        $table->string('location')->nullable();

        $table->string('meeting_link')->nullable();

        $table->date('start_date');

        $table->date('end_date');

        $table->time('start_time');

        $table->time('end_time')->nullable();

        $table->integer('capacity')->nullable();

        $table->string('flyer')->nullable();

        $table->boolean('is_published')->default(false);

        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
