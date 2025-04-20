<?php

namespace App\Http\Requests\Admin\Uploads;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUploadFileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'date_received'     => 'string|required',
            'time_released'     => 'string|required',
            'date_letter'       => 'string|required',
            'subject'           => 'string|required',
            'from'              => 'string|required',
            'agency'            => 'string|required',
            'received_by'       => 'string|required',
            'file'              => 'file|nullable',
            'type_resource'     => 'string|required'
        ];
    }
}
