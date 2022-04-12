<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Phase extends Model
{
    use HasFactory;
    public $table = "phases";

    protected $fillable = [
        'name',
        'description',
        'color',
        'profile_id'
    ];
}
