<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Composition extends Model
{
    use HasFactory;
    public $table = 'compositions';

    protected $fillable = [
        'name',
        'phases_percentage',
        'profile_id',
        'phases_id'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'phases_percentage' => 'array',
        'phases_id' => 'array'
    ];
}
