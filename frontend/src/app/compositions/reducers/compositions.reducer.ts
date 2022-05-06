import { Action, createReducer, on } from '@ngrx/store';
import {
  createComposition,
  createCompositionFailure,
  createCompositionSuccess,
  deleteComposition,
  deleteCompositionFailure,
  deleteCompositionSuccess,
  getCompositionsByProfile,
  getCompositionsByProfileSuccess,
  getCompositionsByProfileFailure,
  updateComposition,
  updateCompositionFailure,
  updateCompositionSuccess,
  assignCurrentCompositions,
} from '../actions';
import { CompositionDTO } from '../models/composition.dto';


export interface CompositionsState {
  compositions: CompositionDTO[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: CompositionsState = {
  compositions: [],
  loading: false,
  loaded: false,
  error: null,
};

const _compositionsReducer = createReducer(
  initialState,
  on(getCompositionsByProfile, (state) => ({
    ...state,
    loaded: false,
    loading: true,
    error: null,
  })),
  on(getCompositionsByProfileSuccess, (state, { compositions, profile_id }) => ({
    ...state,
    compositions: compositions,
    loaded: true,
    loading: false,
    error: null,
  })),
  on(getCompositionsByProfileFailure, (state, { payload }) => ({
    ...state,
    loaded: false,
    loading: false,
    error: { payload },
  })),
  on(createComposition, (state, { composition }) => ({
    ...state,
    loaded: false,
    loading: true,
    error: null,
  })),
  on(createCompositionSuccess, (state, { composition }) => ({
    ...state,
    compositions: [...state.compositions, composition],
    loaded: true,
    loading: false,
    error: null,
  })),
  on(createCompositionFailure, (state, { payload }) => ({
    ...state,
    loaded: false,
    loading: false,
    error: { payload },
  })),
  on(updateComposition, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(updateCompositionSuccess, (state, { composition }) => ({
    ...state,
    compositions: state.compositions.map((prop) => {
      if (prop.id === composition.id) {
        return composition;
      } else {
        return prop;
      }
    }),
    loading: false,
    loaded: true,
    error: null,
  })),
  on(updateCompositionFailure, (state, { payload }) => ({
    ...state,
    loaded: false,
    loading: false,
    error: { payload },
  })),
  on(deleteComposition, (state) => ({
    ...state,
    loaded: false,
    loading: true,
    error: null,
  })),
  on(deleteCompositionSuccess, (state, { compositionId }) => ({
    ...state,
    compositions: state.compositions.filter((prop) => prop.id !== compositionId),
    loaded: true,
    loading: false,
    error: null,
  })),
  on(deleteCompositionFailure, (state, { payload }) => ({
    ...state,
    loaded: false,
    loading: false,
    error: { payload },
  })),
  on(assignCurrentCompositions, (state, { compositions }) => ({
    ...state,
    compositions: compositions,
  }))
);

export function compositionsReducer(
  state: CompositionsState | undefined,
  action: Action
): CompositionsState {
  return _compositionsReducer(state, action);
}
