import { ActionReducerMap } from '@ngrx/store';
import { AuthEffects } from './auth/effects';
import * as AuthReducer from './auth/reducers';
import { ProfilesEffects, UserEffects } from './user/effects';
import {
  profileReducer,
  ProfilesState,
  userReducer,
  UserState,
} from './user/reducers';

export interface AppState {
  auth: AuthReducer.AuthState;
  user: UserState;
  profiles: ProfilesState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: AuthReducer.authReducer,
  user: userReducer,
  profiles: profileReducer,
};

export const EffectsArray: any[] = [AuthEffects, UserEffects, ProfilesEffects];
