<?php

namespace App\Helpers;

class ParamsHelper
{
    public static function paginationParams($params)
    {
        return [
            'raw'           => array_key_exists('raw', $params) ? $params['raw'] === "true" : false,
            'pageNumber'    => array_key_exists('pageNumber', $params) ? intval($params['pageNumber']) : 1,
            'pageSize'      => array_key_exists('pageSize', $params) ? intval($params['pageSize']) : 25,
            'orderBy'       => array_key_exists('orderBy', $params) ? $params['orderBy'] : 'created_at',
            'sortBy'        => array_key_exists('sortBy', $params) ? $params['sortBy'] : 'desc',
        ];
    }

    public static function hasExpectsRawList($params)
    {
        return array_key_exists('raw', $params) && boolval($params['raw']);
    }
}
