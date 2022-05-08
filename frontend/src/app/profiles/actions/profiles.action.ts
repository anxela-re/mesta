import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { CompositionDTO } from 'src/app/compositions/models/composition.dto';
import { PropertyDTO } from 'src/app/properties/models/property.dto';
import { PhaseDTO } from '../../phases/models/phase.dto';
import { ProfileDTO } from '../models/profile.dto';

export const getProfilesByUser = createAction(
  '[Profiles] Get profiles of the user',
  props<{ userId: string }>()
);

export const getProfilesByUserSuccess = createAction(
  '[Profiles] Get profiles of the user success',
  props<{ profiles: ProfileDTO[] }>()
);

export const getProfilesByUserFailure = createAction(
  '[Profiles] Get profiles of the user failure',
  props<{ payload: HttpErrorResponse }>()
);

export const createProfile = createAction(
  '[Profiles] Create profile',
  props<{ profile: ProfileDTO; phases?: PhaseDTO[] }>()
);

export const createProfileSuccess = createAction(
  '[Profiles] Create profile success',
  props<{ profile: ProfileDTO; phases?: PhaseDTO[] }>()
);

export const createProfileFailure = createAction(
  '[Profiles] Create profile failure',
  props<{ payload: HttpErrorResponse }>()
);

export const updateProfile = createAction(
  '[Profiles] Update profile',
  props<{ profile: ProfileDTO }>()
);

export const updateProfileSuccess = createAction(
  '[Profiles] Update profile success',
  props<{ profile: ProfileDTO }>()
);

export const updateProfileFailure = createAction(
  '[Profiles] Update profile failure',
  props<{ payload: HttpErrorResponse }>()
);

export const deleteProfile = createAction(
  '[Profiles] Delete profile',
  props<{ profileId: number }>()
);

export const deleteProfileSuccess = createAction(
  '[Profiles] Delete profile success',
  props<{ profileId: number }>()
);

export const deleteProfileFailure = createAction(
  '[Profiles] Delete profile failure',
  props<{ payload: HttpErrorResponse }>()
);

export const selectProfile = createAction(
  '[Profiles] Select profile',
  props<{ profile: ProfileDTO }>()
);
export const assignPhases = createAction(
  '[Profiles] Assign phases',
  props<{ profile_id: number; phases: PhaseDTO[] }>()
);
export const assignProperties = createAction(
  '[Profiles] Assign properties',
  props<{ profile_id: number; properties: PropertyDTO[] }>()
);
export const assignCompositions = createAction(
  '[Profiles] Assign compositions',
  props<{ profile_id: number; compositions: CompositionDTO[] }>()
);
