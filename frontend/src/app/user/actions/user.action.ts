import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { RegisterDTO } from '../models/register.dto';
import { UserDTO } from '../models/user.dto';

export const register = createAction(
  '[Register] Register',
  props<{ user: RegisterDTO }>()
);

export const registerSuccess = createAction(
  '[Register] Register Success',
  props<{ user: UserDTO }>()
);

export const registerFailure = createAction(
  '[Register] Register Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const getUser = createAction('[User] Get user information');

export const getUserSuccess = createAction(
  '[User] Get user information success',
  props<{ user: UserDTO }>()
);

export const getUserFailure = createAction(
  '[User] Get user information failure',
  props<{ payload: HttpErrorResponse }>()
);

export const updateUser = createAction(
  '[User] Upate user information',
  props<{ user: UserDTO }>()
);

export const updateUserSuccess = createAction(
  '[User] Upate user information success',
  props<{ user: UserDTO }>()
);

export const updateUserFailure = createAction(
  '[User] Upate user information failure',
  props<{ payload: HttpErrorResponse }>()
);

export const deleteUser = createAction(
  '[User] Delete user information',
  props<{ userId: number }>()
);

export const deleteUserSuccess = createAction(
  '[User] Delete user information success',
  props<{ userId: number }>()
);

export const deleteUserFailure = createAction(
  '[User] Delete user information failure',
  props<{ payload: HttpErrorResponse }>()
);
