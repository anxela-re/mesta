import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { NewProfileDTO, ProfileDTO } from '../models/profile.dto';

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
  props<{ profile: NewProfileDTO }>()
);

export const createProfileSuccess = createAction(
  '[Profiles] Create profile success',
  props<{ profile: ProfileDTO }>()
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
  props<{ profileId: number }>()
);
