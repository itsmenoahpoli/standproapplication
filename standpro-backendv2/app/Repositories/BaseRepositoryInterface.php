<?php

namespace App\Repositories;

interface BaseRepositoryInterface
{
    public function getPaginated($page, $pageSize, $orderBy, $sortBy, $optionalParams);

    public function getUnpaginated($orderBy, $sortBy, $optionalParams);

    public function create($data);

    public function updateById($id, $data);

    public function getById($id);

    public function deleteById($id);
}
