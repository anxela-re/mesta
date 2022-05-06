import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { PhaseDTO } from '../models/phase.dto';

export const getPhasesByProfile = createAction(
  '[Phases] Get phases',
  props<{ profile_id: number }>()
);

export const getPhasesByProfileSuccess = createAction(
  '[Phases] Get phases success',
  props<{ phases: PhaseDTO[]; profile_id: number }>()
);

export const getPhasesByProfileFailure = createAction(
  '[Phases] Get phases failure',
  props<{ payload: HttpErrorResponse }>()
);

export const createPhase = createAction(
  '[Phases] Create phase',
  props<{ phase: PhaseDTO }>()
);

export const createPhaseSuccess = createAction(
  '[Phases] Create phase success',
  props<{ phase: PhaseDTO; profile_id: number }>()
);

export const createPhaseFailure = createAction(
  '[Phases] Create phase failure',
  props<{ payload: HttpErrorResponse }>()
);

export const updatePhase = createAction(
  '[Phases] Update phase',
  props<{ phase: PhaseDTO }>()
);

export const updatePhaseSuccess = createAction(
  '[Phases] Update phase success',
  props<{ phase: PhaseDTO; profile_id: number }>()
);

export const updatePhaseFailure = createAction(
  '[Phases] Update phase failure',
  props<{ payload: HttpErrorResponse }>()
);

export const deletePhase = createAction(
  '[Phases] Delete phase',
  props<{ phaseId: number; profile_id: number }>()
);

export const deletePhaseSuccess = createAction(
  '[Phases] Delete phase success',
  props<{ phaseId: number; profile_id: number }>()
);

export const deletePhaseFailure = createAction(
  '[Phases] Delete phase failure',
  props<{ payload: HttpErrorResponse }>()
);

export const assignCurrentPhases = createAction(
  '[Phases] Assign current profile phases',
  props<{ phases: PhaseDTO[] }>()
);
