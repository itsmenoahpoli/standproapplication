<?php

namespace App\Repositories\Admin;

use Illuminate\Database\Eloquent\Model;
use App\Repositories\BaseRepository;

class AccountsRepository extends BaseRepository
{
    public function __construct(
        private readonly Model $model,
        private readonly array $relationships = [],
        private readonly array $showRelationshipsInList = []
    )
    {
        parent::__construct($model, $relationships, $showRelationshipsInList);
    }

    public function create($data)
    {
        $data['password'] = bcrypt($data['password']);

        return parent::create($data);
    }

    public function assignRole($accountId, $roleId)
    {
        return tap($this->model->query())->findOrFail($accountId)->update([
            'user_role_id' => $roleId
        ]);
    }

    public function unassignRole($accountId)
    {
        return tap($this->model->query())->findOrFail($accountId)->update([
            'user_role_id' => null
        ]);
    }
}
