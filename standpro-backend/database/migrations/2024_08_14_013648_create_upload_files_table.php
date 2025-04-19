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
        Schema::create('upload_files', function (Blueprint $table) {
            $table->id();
            $table->foreignId('upload_folder_id')->nullable()->constrained('upload_folders')->cascadeOnDelete();
            $table->enum('type', ['incoming', 'outgoing']);
            $table->enum('type_resource', ['internal', 'external']);
            $table->string('date_received');
            $table->string('time_released');
            $table->string('date_letter');
            $table->string('subject');
            $table->string('from');
            $table->string('agency');
            $table->string('received_by');
            $table->string('name_of_folder');
            $table->text('path');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('upload_files');
    }
};
