import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, finalize, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import * as compositionsActions from '../actions';
import * as profilesActions from '../../profiles/actions';
import { SharedService } from 'src/app/shared/services/shared.service';
import { CompositionsService } from '../services/compositions.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
@Injectable()
export class CompositionsEffects {
  private responseOK: boolean;
  private errorResponse: any;

  constructor(
    private actions$: Actions,
    private compositionsService: CompositionsService,
    private sharedService: SharedService,
    private store: Store<AppState>
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
              profile_id,
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
        map(({ profile_id, compositions }) => {
          this.responseOK = true;
          this.store.dispatch(
            profilesActions.assignCompositions({ profile_id, compositions })
          );
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
              profile_id: data.data.profile_id,
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
        map(({ profile_id }) => {
          this.responseOK = true;
          this.store.select('compositions').subscribe(({ compositions }) => {
            this.store.dispatch(
              profilesActions.assignCompositions({ profile_id, compositions })
            );
          });
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
              profile_id: data.data.profile_id,
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
        map(({ profile_id }) => {
          this.responseOK = true;
          this.store.select('compositions').subscribe(({ compositions }) => {
            this.store.dispatch(
              profilesActions.assignCompositions({ profile_id, compositions })
            );
          });
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
      exhaustMap(({ compositionId, profile_id }) =>
        this.compositionsService.deleteComposition(compositionId).pipe(
          map(() => {
            return compositionsActions.deleteCompositionSuccess({
              compositionId,
              profile_id,
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
        map(({ profile_id }) => {
          this.responseOK = true;
          this.store.select('compositions').subscribe(({ compositions }) => {
            this.store.dispatch(
              profilesActions.assignCompositions({ profile_id, compositions })
            );
          });
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
