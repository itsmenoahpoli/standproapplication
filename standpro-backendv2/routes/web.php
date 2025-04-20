<?php

use App\Http\Controllers\FilesStorageController;
use Illuminate\Support\Facades\Route;

// Route::get('{any}', function () {
//     return view('index');
// })->where('any', '^(?!api\/)[\/\w\.-]*');

Route::get('assets/get', [FilesStorageController::class, 'getFileByPath']);
