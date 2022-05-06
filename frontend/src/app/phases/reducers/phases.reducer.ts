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
  assignCurrentPhases,
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
  on(createPhase, (state) => ({
    ...state,
    loaded: false,
    loading: true,
    error: null,
  })),
  on(createPhaseSuccess, (state, { phase, profile_id }) => ({
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
  on(updatePhaseSuccess, (state, { phase, profile_id }) => ({
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
  on(deletePhaseSuccess, (state, { phaseId, profile_id }) => ({
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
  })),
  on(assignCurrentPhases, (state, { phases }) => ({
    ...state,
    phases: phases,
  }))
);

export function phasesReducer(
  state: PhasesState | undefined,
  action: Action
): PhasesState {
  return _phasesReducer(state, action);
}
