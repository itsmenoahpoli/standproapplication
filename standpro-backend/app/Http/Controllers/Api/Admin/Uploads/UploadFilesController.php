<?php

namespace App\Http\Controllers\Api\Admin\Uploads;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use App\Helpers\ParamsHelper;
use App\Services\Admin\Uploads\UploadFilesService;
use App\Http\Requests\Admin\Uploads\CreateUploadFileRequest;
use App\Http\Requests\Admin\Uploads\UpdateUploadFileRequest;

use function PHPSTORM_META\map;

class UploadFilesController extends Controller
{
    public function __construct(
        private readonly UploadFilesService $service
    )
    {}

    /**
     * Display a listing of 7the resource.
     */
    public function index(Request $request) : JsonResponse
    {
        $params = ParamsHelper::paginationParams($request->query());
        $result = ParamsHelper::hasExpectsRawList($params)
            ? $this->service->getUnpaginated('id', 'desc', $request->query())
            : $this->service->getPaginated(
                $params['pageNumber'],
                $params['pageSize'],
                $params['orderBy'],
                $params['sortBy'],
                $request->query()
            );

        return response()->json($result, Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateUploadFileRequest $request)
    {
        $result = $this->service->create(
            $request->validated(),
            $request->file('file')
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
    public function update(UpdateUploadFileRequest $request, string $id) : JsonResponse
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
}
