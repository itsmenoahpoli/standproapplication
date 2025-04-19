<?php

namespace App\Models\Uploads;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class UploadFile extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    public function upload_folder() : BelongsTo
    {
        return $this->belongsTo(\App\Models\Uploads\UploadFolder::class);
    }
}
