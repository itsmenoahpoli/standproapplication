<?php

namespace App\Services\Admin;

use App\Models\User;
use App\Repositories\Admin\AccountsRepository;
use App\Services\Admin\RolesService;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class AccountsService extends AccountsRepository
{
    public function __construct(
        private readonly User $model,
        private readonly RolesService $rolesService
    )
    {
        parent::__construct($model, ['user_role', 'user_otps', 'user_sessions'], ['user_role']);
    }

    public function assignRole($accountId, $roleId)
    {
        $role = $this->rolesService->getById($roleId);
        $user = parent::getById($accountId);

        if (!$user)
        {
            throw new NotFoundHttpException('ACCOUNT_NOT_FOUND');
        }

        if (!$role)
        {
            throw new NotFoundHttpException('ROLE_NOT_FOUND');
        }

        return parent::assignRole($accountId, $roleId);
    }

    public function unassignRole($accountId)
    {
        $user = parent::getById($accountId);

        if (!$user)
        {
            throw new NotFoundHttpException('ACCOUNT_NOT_FOUND');
        }

        return parent::unassignRole($accountId);
    }
}
