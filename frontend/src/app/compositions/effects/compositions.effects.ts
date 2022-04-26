import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, finalize, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import * as compositionsActions from '../actions';
import { SharedService } from 'src/app/shared/services/shared.service';
import { CompositionsService } from '../services/compositions.service';
@Injectable()
export class CompositionsEffects {
  private responseOK: boolean;
  private errorResponse: any;

  constructor(
    private actions$: Actions,
    private compositionsService: CompositionsService,
    private sharedService: SharedService
  ) {
    this.responseOK = false;
  }
  getCompositionsByProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(compositionsActions.getCompositionsByProfile),
      exhaustMap(({ profile_id }) =>
        this.compositionsService.getCompositions({ profile_id }).pipe(
          map((data) => {
            return compositionsActions.getCompositionsByProfileSuccess({
              compositions: data,
            });
          }),
          catchError((error) => {
            return of(
              compositionsActions.getCompositionsByProfileFailure({
                payload: error,
              })
            );
          }),
          finalize(async () => {
            await this.sharedService.managementToast(
              'loginFeedback',
              this.responseOK,
              this.errorResponse
            );
          })
        )
      )
    )
  );

  getCompositionsByProfileSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(compositionsActions.getCompositionsByProfileSuccess),
        map(() => {
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );

  getCompositionsByProfileFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(compositionsActions.getCompositionsByProfileFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );
  createComposition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(compositionsActions.createComposition),
      exhaustMap(({ composition }) =>
        this.compositionsService.createComposition(composition).pipe(
          map((data) => {
            return compositionsActions.createCompositionSuccess({
              composition: data.data,
            });
          }),
          catchError((error) => {
            return of(
              compositionsActions.createCompositionFailure({ payload: error })
            );
          }),
          finalize(async () => {
            await this.sharedService.managementToast(
              'loginFeedback',
              this.responseOK,
              this.errorResponse
            );
          })
        )
      )
    )
  );

  createCompositionSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(compositionsActions.createCompositionSuccess),
        map(() => {
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );

  createCompositionFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(compositionsActions.createCompositionFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );
  updateComposition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(compositionsActions.updateComposition),
      exhaustMap(({ composition }) =>
        this.compositionsService.updateComposition(composition).pipe(
          map((data) => {
            return compositionsActions.updateCompositionSuccess({
              composition: data.data,
            });
          }),
          catchError((error) => {
            return of(
              compositionsActions.updateCompositionFailure({ payload: error })
            );
          }),
          finalize(async () => {
            await this.sharedService.managementToast(
              'loginFeedback',
              this.responseOK,
              this.errorResponse
            );
          })
        )
      )
    )
  );

  updateCompositionSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(compositionsActions.updateCompositionSuccess),
        map(() => {
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );

  updateCompositionFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(compositionsActions.updateCompositionFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );
  deleteComposition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(compositionsActions.deleteComposition),
      exhaustMap(({ compositionId }) =>
        this.compositionsService.deleteComposition(compositionId).pipe(
          map(() => {
            return compositionsActions.deleteCompositionSuccess({
              compositionId: compositionId,
            });
          }),
          catchError((error) => {
            return of(
              compositionsActions.deleteCompositionFailure({ payload: error })
            );
          }),
          finalize(async () => {
            await this.sharedService.managementToast(
              'loginFeedback',
              this.responseOK,
              this.errorResponse
            );
          })
        )
      )
    )
  );

  deleteCompositionSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(compositionsActions.deleteCompositionSuccess),
        map(() => {
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );

  deleteCompositionFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(compositionsActions.deleteCompositionFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );
}
