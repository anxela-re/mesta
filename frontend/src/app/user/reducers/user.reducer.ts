import { Action, createReducer, on } from '@ngrx/store';
import {
  getUser,
  getUserFailure,
  getUserSuccess,
  register,
  registerFailure,
  registerSuccess,
} from '../actions';
import { PhaseDTO } from '../models/phase.dto';
import { ProfileDTO } from '../models/profile.dto';
import { UserDTO } from '../models/user.dto';

export interface UserState {
  user: UserDTO;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: UserState = {
  user: new UserDTO('Angela', 'Redondo Rodríguez', [
    new ProfileDTO('Perfil 1', 'Descripción perfil 1', '#000', [
      new PhaseDTO('Phase 1', '#000'),
    ]),
  ]),
  loading: false,
  loaded: true,
  error: null,
};

const _userReducer = createReducer(
  initialState,
  on(register, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(registerSuccess, (state, action) => ({
    ...state,
    user: action.user,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(registerFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(getUser, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getUserSuccess, (state, { user }) => ({
    ...state,
    user: user,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getUserFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  }))
);

export function userReducer(
  state: UserState | undefined,
  action: Action
): UserState {
  return _userReducer(state, action);
}
