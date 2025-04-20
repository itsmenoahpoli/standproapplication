<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;
use Spatie\QueryBuilder\QueryBuilder;
use App\Repositories\BaseRepositoryInterface;

class BaseRepository implements BaseRepositoryInterface
{
    private $eloquentModel;

    public function __construct(
        private readonly Model $model,
        private readonly array $relationships,
        private readonly array $showRelationshipsInList,
        private readonly array $searchFilters = [],
        private readonly array $sortFilters = [],

    )
    {
        $this->eloquentModel = $this->model->query();
    }

    public function getPaginated($page = 1, $pageSize = 25, $orderBy = 'created_at', $sortBy = 'asc', $optionalParams)
    {
        return $this->eloquentModel->with($this->showRelationshipsInList)->orderBy($orderBy, $sortBy)->paginate($pageSize);
    }

    public function getUnpaginated($orderBy = 'id', $sortBy = 'desc', $optionalParams)
    {
        return $this->eloquentModel->with($this->showRelationshipsInList)->orderBy($orderBy, $sortBy)->get();
    }

    public function create($data)
    {
        return $this->model->query()->create($data);
    }

    public function updateById($id, $data)
    {
        $this->model->query()->find($id)->update($data);

        return $this->getById($id);
    }

    public function getById($id)
    {
        return $this->model->query()->with($this->relationships)->find($id);
    }

    public function deleteById($id)
    {
        return $this->model->query()->findOrFail($id)->delete();
    }
}
