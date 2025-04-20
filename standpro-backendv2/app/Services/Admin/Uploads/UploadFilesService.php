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


        $payload['path'] = $payload['file']->store('uploads', 'public');

        unset($payload['file']);

        return parent::create($payload);
    }
}
