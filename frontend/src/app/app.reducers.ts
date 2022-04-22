import { ActionReducerMap } from '@ngrx/store';
import { AuthEffects } from './auth/effects';
import * as AuthReducer from './auth/reducers';
import { PropertiesEffects } from './properties/effects';
import { propertiesReducer, PropertiesState } from './properties/reducers';
import { PhasesEffects, ProfilesEffects, UserEffects } from './user/effects';
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
  properties: PropertiesState

}

export const appReducers: ActionReducerMap<AppState> = {
  auth: AuthReducer.authReducer,
  user: userReducer,
  profiles: profileReducer,
  properties: propertiesReducer
};

export const EffectsArray: any[] = [
  AuthEffects,
  UserEffects,
  ProfilesEffects,
  PhasesEffects,
  PropertiesEffects
];
