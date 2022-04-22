import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { PropertyDTO } from '../models/property.dto';

export const getPropertiesByProfile = createAction(
  '[Properties] Get properties',
  props<{ profile_id: number }>()
);

export const getPropertiesByProfileSuccess = createAction(
  '[Phases] Get properties success',
  props<{ properties: PropertyDTO[] }>()
);

export const getPropertiesByProfileFailure = createAction(
  '[Phases] Get properties failure',
  props<{ payload: HttpErrorResponse }>()
);

export const createProperty = createAction(
  '[Phases] Create phase',
  props<{ property: PropertyDTO }>()
);

export const createPropertySuccess = createAction(
  '[Phases] Create property success',
  props<{ property: PropertyDTO }>()
);

export const createPropertyFailure = createAction(
  '[Phases] Create property failure',
  props<{ payload: HttpErrorResponse }>()
);

export const updateProperty = createAction(
  '[Phases] Update property',
  props<{ property: PropertyDTO }>()
);

export const updatePropertySuccess = createAction(
  '[Phases] Update property success',
  props<{ property: PropertyDTO }>()
);

export const updatePropertyFailure = createAction(
  '[Phases] Update property failure',
  props<{ payload: HttpErrorResponse }>()
);

export const deleteProperty = createAction(
  '[Phases] Delete property',
  props<{ propertyId: number }>()
);

export const deletePropertySuccess = createAction(
  '[Phases] Delete property success',
  props<{ propertyId: number }>()
);

export const deletePropertyFailure = createAction(
  '[Phases] Delete property failure',
  props<{ payload: HttpErrorResponse }>()
);
