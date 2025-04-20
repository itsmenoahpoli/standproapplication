<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use App\Services\MailsService;

class SystemController extends Controller
{
    public function healthcheck() : JsonResponse
    {
        return response()->json(['status' => 'online'], Response::HTTP_OK);
    }

    public function testmail()
    {
        return MailsService::sendMail();
    }
}
