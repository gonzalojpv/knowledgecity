<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Api\BaseController as BaseController;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Foundation\Auth\VerifiesEmails;
use App\Http\Resources\User as UserResource;
use Validator;
use Hash;

class RegisterController extends BaseController
{

    /**
     * Login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $remember_token = ($request->has('remember_token')) ? true : false;

        $fieldType = filter_var($request->username, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';

        if(Auth::attempt([ $fieldType => $request->username, 'password' => $request->password], $remember_token)){
            $user = Auth::user();

            return $this->sendResponse(new UserResource($user), 'User login successfully.');
        }
        else{
            return $this->sendError('Unauthorised.', ['error'=>'Unauthorised']);
        }
    }
}
