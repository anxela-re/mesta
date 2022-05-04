import { ActionReducerMap } from '@ngrx/store';
import { AuthEffects } from './auth/effects';
import { CompositionsEffects } from './compositions/effects/compositions.effects';
import { PropertiesEffects } from './properties/effects';
import { UserEffects } from './user/effects';
import { ProfilesEffects } from './profiles/effects';
import { PhasesEffects } from './phases/effects';
import { propertiesReducer, PropertiesState } from './properties/reducers';
import { userReducer, UserState } from './user/reducers';
import { profileReducer, ProfilesState } from './profiles/reducers';
import { phasesReducer, PhasesState } from './phases/reducers';
import {
  compositionsReducer,
  CompositionsState,
} from './compositions/reducers';
import { authReducer, AuthState } from './auth/reducers';

export interface AppState {
  auth: AuthState;
  user: UserState;
  profiles: ProfilesState;
  phases: PhasesState
  properties: PropertiesState;
  compositions: CompositionsState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  user: userReducer,
  profiles: profileReducer,
  properties: propertiesReducer,
  compositions: compositionsReducer,
  phases: phasesReducer
};

export const EffectsArray: any[] = [
  AuthEffects,
  UserEffects,
  ProfilesEffects,
  PhasesEffects,
  PropertiesEffects,
  CompositionsEffects,
];
