<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EventRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required',
            'start' => 'required|date_format:Y-m-d H:i:s',
            'user_id' => 'exists:App\Models\User,id',
            'end' => 'date_format:Y-m-d H:i:s|after_or_equal:start',
            'address' => 'required',
            'priority' => 'numeric|between:1,3',
            'user_assigned' => 'array',
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'Title is required!',
            'user_id.exists' => 'User is required!',
            'address' => 'Address is required!',
            'end.after_or_equal' => 'End time is after start date',
        ];
    }
}
