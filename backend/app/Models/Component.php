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
        'scientific_name',
        'description',
        'profile_id',
        'phase_id,',
        'properties',
        'image_url',
        'expiration_date'
    ];

    protected $casts = [
        'properties' => 'array',
    ];
}
