import { ActionReducerMap } from '@ngrx/store';
import { AuthEffects } from './auth/effects';
import * as AuthReducer from './auth/reducers';
import { CompositionsEffects } from './compositions/effects/compositions.effects';
import {
  compositionsReducer,
  CompositionsState,
} from './compositions/reducers';
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
  properties: PropertiesState;
  compositions: CompositionsState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: AuthReducer.authReducer,
  user: userReducer,
  profiles: profileReducer,
  properties: propertiesReducer,
  compositions: compositionsReducer,
};

export const EffectsArray: any[] = [
  AuthEffects,
  UserEffects,
  ProfilesEffects,
  PhasesEffects,
  PropertiesEffects,
  CompositionsEffects,
];
