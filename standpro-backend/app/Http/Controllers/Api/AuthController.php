<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Requests\Auth\LoginRequest;
use App\Services\AuthService;

class AuthController extends Controller
{
    public function __construct(
        private readonly AuthService $authService
    )
    {}

    public function login(LoginRequest $request) : JsonResponse
    {
        $result = $this->authService->authenticate($request->validated());

        return response()->json($result, Response::HTTP_OK);
    }

    public function logout(Request $request, $sessionId): JsonResponse
    {
        $result = $this->authService->unauthenticate($request->user(), $sessionId);

        return response()->json($result, Response::HTTP_OK);
    }
}
