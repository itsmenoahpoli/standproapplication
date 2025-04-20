<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use App\Services\FilesService;

class FilesController extends Controller
{
    public function __construct(
        private readonly FilesService $service
    )
    {}

    public function getFilesReportByDaily(): JsonResponse
    {
        $result = $this->service->getFilesReportByDaily();

        return response()->json($result, Response::HTTP_OK);
    }

    public function getFilesReportByMonthly(): JsonResponse
    {
        $result = $this->service->getFilesReportByMonthly();

        return response()->json($result, Response::HTTP_OK);
    }

    public function getFilesReportByYearly(): JsonResponse
    {
        $result = $this->service->getFilesReportByYearly();

        return response()->json($result, Response::HTTP_OK);
    }
}
