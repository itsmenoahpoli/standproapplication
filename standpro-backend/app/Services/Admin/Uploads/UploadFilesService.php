<?php

namespace App\Services\Admin\Uploads;

use App\Models\Uploads\UploadFile;
use App\Repositories\Admin\Uploads\UploadFilesRepository;
use App\Services\Admin\Uploads\UploadFoldersService;

class UploadFilesService extends UploadFilesRepository
{
    public function __construct(
        UploadFile $model,
        private readonly UploadFoldersService $uploadFoldersService
    )
    {
        parent::__construct($model, ['upload_folder'], ['upload_folder']);
    }

    public function create($payload)
    {
        $folderPath = $this->uploadFoldersService->getById($payload['upload_folder_id']);

        if ($folderPath) {
            $payload['name_of_folder'] = $folderPath->name;
        }

        $payload['path'] = $payload['file']->store('uploads', 'public');
        // $payload['upload_folder_id'] = null;

        unset($payload['file']);

        return parent::create($payload);
    }
}
