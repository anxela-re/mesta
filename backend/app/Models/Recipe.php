<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    use HasFactory;
    public $table = 'recipes';

    protected $fillable = [
        'name',
        'description',
        'profile_id',
        'composition_id',
        'components',
        'properties'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'properties' => 'array',
        'components' => 'array'
    ];
}
