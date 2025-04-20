<?php

namespace App\Services\Admin\Uploads;

use App\Models\Uploads\UploadFile;
use App\Repositories\Admin\Uploads\UploadFilesRepository;

class UploadFilesService extends UploadFilesRepository
{
    public function __construct(
        UploadFile $model,
    )
    {
        parent::__construct($model, [], []);
    }

    public function create($payload)
    {
        $storagePath = $payload['file']->store('uploads', 'public');
        $payload['path'] = env('APP_URL') . '/storage/' . $storagePath;

        unset($payload['file']);

        return parent::create($payload);
    }
}
