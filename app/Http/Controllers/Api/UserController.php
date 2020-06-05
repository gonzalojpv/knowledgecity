<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController as BaseController;
use Illuminate\Http\Request;
use App\User;
use Validator;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\User as UserResource;

class UserController extends BaseController
{
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::find($id);

        if ( is_null($user) ) {
            return $this->sendError('User not found.');
        }

        return $this->sendResponse(new UserResource($user), 'User retrieved successfully.');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'first_name' => 'required',
            'last_name' => 'required',
        ]);

          if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $user = Auth::user();
        $user->first_name = $input['first_name'];
        $user->last_name = $input['last_name'];
        $user->save();

        return $this->sendResponse(new UserResource($user), 'User updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $output = [
            'id'           => $user->id,
            'first_name'   => $user->first_name,
            'last_name'    => $user->last_name,
            'email'        => $user->email,
            'token'        => null,
        ];
        return $this->sendResponse($output, 'LogOut successfully.');
    }
}
