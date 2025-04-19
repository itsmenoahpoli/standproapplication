<?php

namespace App\Services\Admin;

use App\Models\Users\UserRole;
use App\Repositories\Admin\RolesRepository;

class RolesService extends RolesRepository
{
    public function __construct(UserRole $model)
    {
        parent::__construct($model, ['users'], []);
    }
}
