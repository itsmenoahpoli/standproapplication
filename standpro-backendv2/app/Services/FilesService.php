<?php

namespace App\Services;

use App\Models\Uploads\UploadFile;

class FilesService
{
    public function __construct(
        private readonly UploadFile $model
    )
    {}

    public function getFilesReportByDaily()
    {
        $summary = $this->model->query()
            ->selectRaw('DATE(date_received) as date, COUNT(*) as total')
            ->groupBy('date')
            ->orderBy('date', 'desc')
            ->get();

        $records = $summary->map(function ($item) {
            return [
                'date' => $item->date,
                'total' => $item->total,
                'records' => $this->model->query()
                    ->whereDate('date_received', $item->date)
                    ->get()
            ];
        });

        return $records;
    }

    public function getFilesReportByMonthly()
    {
        $summary = $this->model->query()
            ->selectRaw('DATE_FORMAT(date_received, "%Y-%m") as month, COUNT(*) as total')
            ->groupBy('month')
            ->orderBy('month', 'desc')
            ->get();

        $records = $summary->map(function ($item) {
            return [
                'month' => $item->month,
                'total' => $item->total,
                'records' => $this->model->query()
                    ->whereRaw('DATE_FORMAT(date_received, "%Y-%m") = ?', [$item->month])
                    ->get()
            ];
        });

        return $records;
    }

    public function getFilesReportByYearly()
    {
        $summary = $this->model->query()
            ->selectRaw('YEAR(date_received) as year, COUNT(*) as total')
            ->groupBy('year')
            ->orderBy('year', 'desc')
            ->get();

        $records = $summary->map(function ($item) {
            return [
                'year' => $item->year,
                'total' => $item->total,
                'records' => $this->model->query()
                    ->whereYear('date_received', $item->year)
                    ->get()
            ];
        });

        return $records;
    }
}
