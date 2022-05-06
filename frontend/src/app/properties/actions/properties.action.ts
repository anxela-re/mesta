import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { PropertyDTO } from '../models/property.dto';

export const getPropertiesByProfile = createAction(
  '[Properties] Get properties',
  props<{ profile_id: number }>()
);

export const getPropertiesByProfileSuccess = createAction(
  '[Properties] Get properties success',
  props<{ properties: PropertyDTO[], profile_id: number }>()
);

export const getPropertiesByProfileFailure = createAction(
  '[Properties] Get properties failure',
  props<{ payload: HttpErrorResponse }>()
);

export const createProperty = createAction(
  '[Properties] Create phase',
  props<{ property: PropertyDTO }>()
);

export const createPropertySuccess = createAction(
  '[Properties] Create property success',
  props<{ property: PropertyDTO, profile_id: number }>()
);

export const createPropertyFailure = createAction(
  '[Properties] Create property failure',
  props<{ payload: HttpErrorResponse }>()
);

export const updateProperty = createAction(
  '[Properties] Update property',
  props<{ property: PropertyDTO }>()
);

export const updatePropertySuccess = createAction(
  '[Properties] Update property success',
  props<{ property: PropertyDTO, profile_id: number }>()
);

export const updatePropertyFailure = createAction(
  '[Properties] Update property failure',
  props<{ payload: HttpErrorResponse }>()
);

export const deleteProperty = createAction(
  '[Properties] Delete property',
  props<{ propertyId: number, profile_id: number }>()
);

export const deletePropertySuccess = createAction(
  '[Properties] Delete property success',
  props<{ propertyId: number, profile_id: number }>()
);

export const deletePropertyFailure = createAction(
  '[Properties] Delete property failure',
  props<{ payload: HttpErrorResponse }>()
);
export const assignCurrentProperties = createAction(
  '[Phases] Assign current profile properties',
  props<{ properties: PropertyDTO[] }>()
);
