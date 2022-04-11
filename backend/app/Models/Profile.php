<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;
    public $table = "profiles";

    protected $fillable = [
        'name',
        'description',
        'user_id'
    ];
}
