<?php

namespace App\Repositories\Admin\Uploads;

use Illuminate\Database\Eloquent\Model;
use App\Repositories\BaseRepository;

class UploadFoldersRepository extends BaseRepository
{
    public function __construct(
        private readonly Model $model,
        private readonly array $relationships = [],
        private readonly array $shownRelationshipsInList = []

    )
    {
        parent::__construct($model, $relationships, $shownRelationshipsInList);
    }
}
