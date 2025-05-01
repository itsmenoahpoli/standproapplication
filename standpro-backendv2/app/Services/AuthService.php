<?php

namespace App\Services;

use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
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

    public function createAccount($data)
    {
        $data['password'] = Hash::make($data['password']);

        return $this->user->create($data);
    }

    public function checkSystemHasUser()
    {
        $hasUsers = User::count() > 0;

        return $hasUsers;
    }

    public function verifyMobileNumber($mobileNumber)
    {
        $user = User::where('mobile_number', $mobileNumber)->first();

        if (!$user) {
            throw new HttpException(404, 'USER_NOT_FOUND');
        }

        return true;
    }

    public function resetPassword($mobileNumber, $password)
    {
        $user = User::where('mobile_number', $mobileNumber)->first();

        if (!$user) {
            throw new HttpException(404, 'USER_NOT_FOUND');
        }

        $user->update([
            'password' => Hash::make($password)
        ]);

        return true;
    }
}
