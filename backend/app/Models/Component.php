<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Component extends Model
{
    use HasFactory;
    public $table = 'components';

    protected $fillable = [
        'name',
        'description',
        'profile_id',
        'phase_id,',
        'properties',
        'image_url'
    ];


    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'properties' => 'array'
    ];
}
