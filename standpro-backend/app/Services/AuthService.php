<?php

namespace App\Services;

use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthService
{
    public function __construct(
        private readonly User $user
    )
    {}

    public function authenticate($credentials)
    {
        if (Auth::attempt($credentials))
        {
            /**
             * @var App\Models\User $user
             */
            $user = Auth::user();
            $token = $user->createToken(
                'authToken', ['*'], now()->addHours(24)
            )->plainTextToken;

            return (object) array(
                'token'     => $token,
                'user'      => $user
            );
        }

        throw new HttpException(401, 'USER_NOT_FOUND');
    }

    public function unauthenticate($user)
    {
        $user->currentAccessToken()->delete();

        return null;
    }
}
