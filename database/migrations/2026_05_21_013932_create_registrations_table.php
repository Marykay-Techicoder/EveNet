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
    Schema::create('registrations', function (Blueprint $table) {

        $table->id();

        $table->foreignId('event_id')
            ->constrained()
            ->onDelete('cascade');

        $table->string('full_name');

        $table->string('email');

        $table->string('phone');

        $table->string('location');

        $table->string('referral_source')->nullable();

        $table->text('expectation')->nullable();

        $table->string('image')->nullable();

        $table->string('ticket_code')->unique();

        $table->timestamp('checked_in_at')->nullable();

        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registrations');
    }
};
