import { Action, createReducer, on } from '@ngrx/store';
import {
  createPhase,
  createPhaseFailure,
  createPhaseSuccess,
  deletePhase,
  deletePhaseFailure,
  deletePhaseSuccess,
  getPhasesByProfile,
  getPhasesByProfileSuccess,
  getPhasesByProfileFailure,
  updatePhase,
  updatePhaseFailure,
  updatePhaseSuccess,
} from '../actions';
import { PhaseDTO } from '../models/phase.dto';

export interface PhasesState {
  phases: PhaseDTO[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: PhasesState = {
  phases: [],
  loading: false,
  loaded: false,
  error: null,
};

const _phasesReducer = createReducer(
  initialState,
  on(getPhasesByProfile, (state) => ({
    ...state,
    loaded: false,
    loading: true,
    error: null,
  })),
  on(getPhasesByProfileSuccess, (state, { phases }) => ({
    ...state,
    phases: phases,
    loaded: true,
    loading: false,
    error: null,
  })),
  on(getPhasesByProfileFailure, (state, { payload }) => ({
    ...state,
    loaded: false,
    loading: false,
    error: { payload },
  })),
  on(createPhase, (state, { phase }) => ({
    ...state,
    loaded: false,
    loading: true,
    error: null,
  })),
  on(createPhaseSuccess, (state, { phase }) => ({
    ...state,
    phases: [...state.phases, phase],
    loaded: true,
    loading: false,
    error: null,
  })),
  on(createPhaseFailure, (state, { payload }) => ({
    ...state,
    loaded: false,
    loading: false,
    error: { payload },
  })),
  on(updatePhase, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(updatePhaseSuccess, (state, { phase }) => ({
    ...state,
    phases: state.phases.map((prop) => {
      if (prop.id === phase.id) {
        return phase;
      } else {
        return prop;
      }
    }),
    loading: false,
    loaded: true,
    error: null,
  })),
  on(updatePhaseFailure, (state, { payload }) => ({
    ...state,
    loaded: false,
    loading: false,
    error: { payload },
  })),
  on(deletePhase, (state) => ({
    ...state,
    loaded: false,
    loading: true,
    error: null,
  })),
  on(deletePhaseSuccess, (state, { phaseId }) => ({
    ...state,
    phases: state.phases.filter((prop) => prop.id !== phaseId),
    loaded: true,
    loading: false,
    error: null,
  })),
  on(deletePhaseFailure, (state, { payload }) => ({
    ...state,
    loaded: false,
    loading: false,
    error: { payload },
  }))
);

export function phasesReducer(
  state: PhasesState | undefined,
  action: Action
): PhasesState {
  return _phasesReducer(state, action);
}
