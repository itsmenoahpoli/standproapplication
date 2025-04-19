<?php

namespace App\Services\Admin\Uploads;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use App\Models\Uploads\UploadFolder;
use App\Repositories\Admin\Uploads\UploadFoldersRepository;

class UploadFoldersService extends UploadFoldersRepository
{
    public function __construct(UploadFolder $model)
    {
        parent::__construct($model, ['upload_files'], []);
    }

    public function create($payload)
    {
        $payload['name_slug'] = Str::slug($payload['name']);
        $payload['path'] = 'uploads/'.$payload['name_slug'];
        
        Storage::disk('local')->makeDirectory($payload['path']);

        return parent::create($payload);
    }
}
