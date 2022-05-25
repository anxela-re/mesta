import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { AuthDTO } from '../models/auth.dto';
import { AuthTokenDTO } from '../models/authToken.dto';

export const login = createAction(
  '[AUTH] Login',
  props<{ credentials: AuthDTO }>()
);

export const loginSuccess = createAction(
  '[AUTH] Login Success',
  props<{ credentials: AuthTokenDTO }>()
);

export const loginFailure = createAction(
  '[AUTH] Login Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const logout = createAction('LOGOUT');
