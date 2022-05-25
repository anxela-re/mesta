import { Action, createReducer, on } from '@ngrx/store';
import {
  login,
  loginSuccess,
  loginFailure,
  logout,
} from '../actions/auth.action';
import { AuthTokenDTO } from '../models/authToken.dto';

export interface AuthState {
  credentials: AuthTokenDTO;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: AuthState = {
  credentials: new AuthTokenDTO('', ''),
  loading: false,
  loaded: false,
  error: null,
};

const _authReducer = createReducer(
  initialState,
  on(login, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(loginSuccess, (state, { credentials }) => ({
    ...state,
    credentials: credentials,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(loginFailure, (state, { payload }) => {
    return {
      ...state,
      loading: false,
      loaded: false,
      error: { payload },
    };
  }),
  on(logout, () => ({ ...initialState, credentials: new AuthTokenDTO() }))
);

export function authReducer(
  state: AuthState | undefined,
  action: Action
): AuthState {
  return _authReducer(state, action);
}
