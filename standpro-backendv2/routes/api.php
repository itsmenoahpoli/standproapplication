<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\SystemController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\FilesController;

/**
 * Admin Modules
 */
use App\Http\Controllers\Api\Admin\AccountsController;
use App\Http\Controllers\Api\Admin\RolesController;
use App\Http\Controllers\Api\Admin\Uploads\UploadFilesController;

Route::prefix('v1')->group(function() {
   /**
     * Auth Routes
     */
    Route::prefix('auth')->group(function () {
        Route::post('login', [AuthController::class, 'login'])->name('auth.login');
        Route::post('register', [AuthController::class, 'register'])->name('auth.register');

        Route::middleware('auth:sanctum')->group(function () {
            Route::post('logout', [AuthController::class, 'logout'])->name('auth.logout');
        });
    });


    Route::get('healthcheck', [SystemController::class, 'healthcheck'])->name('api.healthcheck');
    Route::post('testmail', [SystemController::class, 'testmail'])->name('api.testmail');

    Route::prefix('admin')->group(function () {
        /**
         * Auth management
         */
        Route::apiResources([
            'accounts'      => AccountsController::class,
            'roles'         => RolesController::class,
        ]);


        /**
         * Assign role to account
         */
        Route::patch('accounts/{accountId}role/assign/{userRoleId}', [AccountsController::class, 'assignRoleToAccount']);
        Route::patch('accounts/{accountId}role/unassign', [AccountsController::class, 'unassignRoleToAccount']);

        /**
         * Files Management
         */
        Route::apiResources([
            'record-logs' => UploadFilesController::class,
        ]);

        /**
         * Files Reports
         */
        Route::prefix('files-report')->group(function () {
            Route::get('daily', [FilesController::class, 'getFilesReportByDaily']);
            Route::get('monthly', [FilesController::class, 'getFilesReportByMonthly']);
            Route::get('yearly', [FilesController::class, 'getFilesReportByYearly']);
        });
    });
});
