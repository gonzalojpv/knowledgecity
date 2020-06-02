<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController as BaseController;
use Illuminate\Http\Request;
use App\Student;
use App\Http\Resources\Student as StudentResource;

class StudentController extends BaseController
{
    public function index() {
        $students = Student::all();
        return $this->sendResponse(StudentResource::collection($students), 'Students retrieved successfully.');
    }
}
