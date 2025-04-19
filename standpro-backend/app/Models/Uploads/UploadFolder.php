<?php

namespace App\Models\Uploads;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class UploadFolder extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function upload_files() : HasMany
    {
        return $this->hasMany(\App\Models\Uploads\UploadFile::class);
    }
}
