<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
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

    public function register(RegisterRequest $request) : JsonResponse
    {
        $result = $this->authService->createAccount($request->validated());

        return response()->json($result, Response::HTTP_CREATED);
    }

    public function checkUsers() : JsonResponse
    {
        $result = $this->authService->checkSystemHasUser();

        return response()->json([
            'has_users' => $result
        ], Response::HTTP_OK);
    }

    public function verifyMobileNumber(Request $request) : JsonResponse
    {
        $result = $this->authService->verifyMobileNumber($request->mobile_number);

        return response()->json($result, Response::HTTP_OK);
    }

    public function resetPassword(Request $request) : JsonResponse
    {
        $result = $this->authService->resetPassword($request->mobile_number, $request->password);

        return response()->json($result, Response::HTTP_OK);
    }
}
