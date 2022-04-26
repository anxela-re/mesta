import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { CompositionDTO } from '../models/composition.dto';

export const getCompositionsByProfile = createAction(
    '[Compositions] Get compositions',
    props<{ profile_id: number }>()
  );
  
  export const getCompositionsByProfileSuccess = createAction(
    '[Compositions] Get compositions success',
    props<{ compositions: CompositionDTO[] }>()
  );
  
  export const getCompositionsByProfileFailure = createAction(
    '[Compositions] Get compositions failure',
    props<{ payload: HttpErrorResponse }>()
  );
  
  export const createComposition = createAction(
    '[Compositions] Create phase',
    props<{ composition: CompositionDTO }>()
  );
  
  export const createCompositionSuccess = createAction(
    '[Compositions] Create composition success',
    props<{ composition: CompositionDTO }>()
  );
  
  export const createCompositionFailure = createAction(
    '[Compositions] Create composition failure',
    props<{ payload: HttpErrorResponse }>()
  );
  
  export const updateComposition = createAction(
    '[Compositions] Update composition',
    props<{ composition: CompositionDTO }>()
  );
  
  export const updateCompositionSuccess = createAction(
    '[Compositions] Update composition success',
    props<{ composition: CompositionDTO }>()
  );
  
  export const updateCompositionFailure = createAction(
    '[Compositions] Update composition failure',
    props<{ payload: HttpErrorResponse }>()
  );
  
  export const deleteComposition = createAction(
    '[Compositions] Delete composition',
    props<{ compositionId: number }>()
  );
  
  export const deleteCompositionSuccess = createAction(
    '[Compositions] Delete composition success',
    props<{ compositionId: number }>()
  );
  
  export const deleteCompositionFailure = createAction(
    '[Compositions] Delete composition failure',
    props<{ payload: HttpErrorResponse }>()
  );
  