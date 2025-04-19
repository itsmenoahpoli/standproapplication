<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use App\Helpers\ParamsHelper;
use App\Services\Admin\AccountsService;
use App\Http\Requests\Admin\Account\CreateAccountRequest;
use App\Http\Requests\Admin\Account\UpdateAccountRequest;

class AccountsController extends Controller
{
    public function __construct(
        private readonly AccountsService $service
    )
    {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request) : JsonResponse
    {
        $params = ParamsHelper::paginationParams($request->query());
        $result = ParamsHelper::hasExpectsRawList($params)
            ? $this->service->getUnpaginated()
            : $this->service->getPaginated(
                $params['pageNumber'],
                $params['pageSize'],
                $params['orderBy'],
                $params['sortBy']
            );

        return response()->json($result, Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateAccountRequest $request)
    {
        $result = $this->service->create(
            $request->validated()
        );

        return response()->json($result, Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) : JsonResponse
    {
        $result = $this->service->getById($id);

        return response()->json($result, Response::HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAccountRequest $request, string $id) : JsonResponse
    {
        $result = $this->service->updateById(
            $id,
            $request->validated()
        );

        return response()->json($result, Response::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) : JsonResponse
    {
        $result = $this->service->deleteById($id);

        return response()->json($result, Response::HTTP_NO_CONTENT);
    }

    /**
     * Assign role to account
     */
    public function assignRoleToAccount($accountId, $roleId)
    {
        $result = $this->service->assignRole($accountId, $roleId);

        return response()->json($result, Response::HTTP_OK);
    }

    public function unassignRoleToAccount($accountId)
    {
        $result = $this->service->unassignRole($accountId);

        return response()->json($result, Response::HTTP_OK);
    }
}
