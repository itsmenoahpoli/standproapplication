<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use Resend\Laravel\Facades\Resend;
use Symfony\Component\HttpKernel\Exception\HttpException;


class MailsService
{
    public static function sendMail()
    {
        try
        {
            Resend::emails()->send([
                'from' => 'Acme <onboarding@resend.dev>',
                'to' => ['ninopolicarpio72@gmail.com'],
                'subject' => 'Test Mail',
                'text' => 'test mail'
            ]);

            return true;
        } catch(\Exception $e)
        {
            Log::error($e->getMessage());
            throw new HttpException(500, $e->getMessage());
        }
    }
}
