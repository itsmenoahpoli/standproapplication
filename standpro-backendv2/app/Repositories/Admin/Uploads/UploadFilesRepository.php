<?php

namespace App\Repositories\Admin\Uploads;

use Illuminate\Database\Eloquent\Model;
use App\Repositories\BaseRepository;

class UploadFilesRepository extends BaseRepository
{
    public function __construct(
        private readonly Model $model,
        private readonly array $relationships = [],
        private readonly array $shownRelationshipsInList = []

    )
    {
        parent::__construct($model, $relationships, $shownRelationshipsInList);
    }

    public function getUnpaginated($orderBy = 'id', $sortBy = 'desc', $optionalParams)
    {
        if ($optionalParams['type']) {
            return $this->model->query()->where('type', $optionalParams['type'])->get();
        }
        
        return parent::getUnpaginated($orderBy, $sortBy, null);
    }
}
