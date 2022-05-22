<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Query\Expression;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('components', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description');
            $table->string('image_url');
            $table->date('expiration_date');
            $table->foreignId('profile_id')->constrained('profiles')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('phase_id')->constrained('phases')->onDelete('cascade')->onUpdate('cascade');
            $table->json('properties')->default(new Expression('[]'))->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('components');
    }
};
