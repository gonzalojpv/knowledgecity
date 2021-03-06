<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController as BaseController;
use Illuminate\Http\Request;
use App\Student;
use App\Http\Resources\Student as StudentResource;

class StudentController extends BaseController
{
    public function index(Request $request) {
        $keyword = $request->get('search');
        $perPage = 5;

        if (!empty($keyword)) {
            $students = Student::where('first_name', 'LIKE', "%$keyword%")->orWhere('email', 'LIKE', "%$keyword%")
                ->latest()->paginate($perPage);
        } else {
            $students = Student::latest()->paginate($perPage);
        }

        $total = Student::count();
        $output = [ 'total' => ($total / $perPage) ];
        return $this->sendResponse(StudentResource::collection($students), 'Students retrieved successfully.', $output);
    }
}
