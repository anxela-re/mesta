import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { PhaseDTO } from '../models/phase.dto';

export const getPhasesByProfile = createAction(
  '[Phases] Get Phases of the profile',
  props<{ profile_id: number }>()
);

export const getPhasesByProfileSuccess = createAction(
  '[Phases] Get phases of the profile success',
  props<{ profile_id: number; phases: PhaseDTO[] }>()
);

export const getPhasesByProfileFailure = createAction(
  '[Phases] Get phases of the profile failure',
  props<{ payload: HttpErrorResponse }>()
);

export const createPhase = createAction(
  '[Phases] Create phase',
  props<{ phase: PhaseDTO; profileId: number }>()
);

export const createPhaseSuccess = createAction(
  '[Phases] Create phase success',
  props<{ phase: PhaseDTO; profileId: number }>()
);

export const createPhaseFailure = createAction(
  '[Phases] Create phase failure',
  props<{ payload: HttpErrorResponse }>()
);

export const updatePhase = createAction(
  '[Phases] Update phase',
  props<{ phase: PhaseDTO; phaseId: number }>()
);

export const updatePhaseSuccess = createAction(
  '[Phases] Update phase success',
  props<{ phase: PhaseDTO; phaseId: number }>()
);

export const updatePhaseFailure = createAction(
  '[Phases] Update phase failure',
  props<{ payload: HttpErrorResponse }>()
);

export const deletePhase = createAction(
  '[Phases] Delete phase',
  props<{ phaseId: number }>()
);

export const deletePhaseSuccess = createAction(
  '[Phases] Delete phase success',
  props<{ phaseId: number }>()
);

export const deletePhaseFailure = createAction(
  '[Phases] Delete phase failure',
  props<{ payload: HttpErrorResponse }>()
);
