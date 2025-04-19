<?php

namespace App\Helpers;

class FilesHelper
{
    public function upload($file, $dir)
    {
        $path = $file->store($dir, 'public');

        return $this->setFileUrl($path);
    }

    public function setFileUrl($path)
    {
        return env('APP_URL') . '/files-storage/get?path=' . $path;
    }
}
