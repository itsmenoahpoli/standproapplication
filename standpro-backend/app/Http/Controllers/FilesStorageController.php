<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Response;

class FilesStorageController extends Controller
{
    public function getFileByPath(Request $request)
    {
        $path = $request->query('path');
        $filePath = storage_path('app/public/' . $path);

        if (!Storage::disk('public')->exists($path)) {
            abort(404);
        }

        $mimeType = Storage::mimeType('public/' . $path);

        return Response::make(file_get_contents($filePath), 200, [
            'Content-Type' => $mimeType,
            'Content-Disposition' => 'inline; filename="' . basename($filePath) . '"',
        ]);
    }
}
