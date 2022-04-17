import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { ComponentDTO } from '../models/component.dto';

export const getComponents = createAction(
  '[Components] Get components',
  props<{ profileId: number, phaseId: number }>()
);

export const getComponentsSuccess = createAction(
  '[Components] Get components success',
  props<{ phases: ComponentDTO[] }>()
);

export const getComponentsFailure = createAction(
  '[Components] Get components failure',
  props<{ payload: HttpErrorResponse }>()
);
