import { ActionReducerMap } from '@ngrx/store';
import { AuthEffects } from './auth/effects';
import * as AuthReducer from './auth/reducers';
import { UserEffects } from './user/effects';
import * as UserReducer from './user/reducers';

export interface AppState {
  auth: AuthReducer.AuthState;
  user: UserReducer.UserState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: AuthReducer.authReducer,
  user: UserReducer.userReducer,
};

export const EffectsArray: any[] = [AuthEffects, UserEffects];
