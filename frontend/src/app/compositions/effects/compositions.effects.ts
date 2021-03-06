import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import * as compositionsActions from '../actions';
import * as profilesActions from '../../profiles/actions';
import { CompositionsService } from '../services/compositions.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { ToastService } from 'src/app/shared/services/toast.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
@Injectable()
export class CompositionsEffects {
  constructor(
    private actions$: Actions,
    private compositionsService: CompositionsService,
    private store: Store<AppState>,
    private toastService: ToastService,
    private loadingService: LoadingService
  ) {}
  getCompositionsByProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(compositionsActions.getCompositionsByProfile),
      exhaustMap(({ profile_id }) => {
        this.loadingService.showLoading(
          'compositions_getCompositionsByProfile'
        );
        return this.compositionsService.getCompositions({ profile_id }).pipe(
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
          })
        );
      })
    )
  );

  getCompositionsByProfileSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(compositionsActions.getCompositionsByProfileSuccess),
        map(({ profile_id, compositions }) => {
          this.loadingService.hideLoading(
            'compositions_getCompositionsByProfile'
          );
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
        map(() => {
          this.loadingService.hideLoading(
            'compositions_getCompositionsByProfile'
          );
          this.toastService.showToast(false, '??Algo est?? fallando!');
        })
      ),
    { dispatch: false }
  );
  createComposition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(compositionsActions.createComposition),
      exhaustMap(({ composition }) => {
        this.loadingService.showLoading('compositions_createComposition');
        return this.compositionsService.createComposition(composition).pipe(
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
          })
        );
      })
    )
  );

  createCompositionSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(compositionsActions.createCompositionSuccess),
        map(({ profile_id }) => {
          this.loadingService.hideLoading('compositions_createComposition');
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
        map(async () => {
          this.loadingService.hideLoading('compositions_createComposition');
          this.toastService.showToast(false, '??Algo est?? fallando!');
        })
      ),
    { dispatch: false }
  );
  updateComposition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(compositionsActions.updateComposition),
      exhaustMap(({ composition }) => {
        this.loadingService.showLoading('compositions_updateComposition');
        return this.compositionsService.updateComposition(composition).pipe(
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
          })
        );
      })
    )
  );

  updateCompositionSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(compositionsActions.updateCompositionSuccess),
        map(({ profile_id }) => {
          this.loadingService.hideLoading('compositions_updateComposition');
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
        map(async () => {
          this.loadingService.hideLoading('compositions_updateComposition');
          this.toastService.showToast(false, '??Algo est?? fallando!');
        })
      ),
    { dispatch: false }
  );
  deleteComposition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(compositionsActions.deleteComposition),
      exhaustMap(({ compositionId, profile_id }) => {
        this.loadingService.showLoading('compositions_deleteComposition');
        return this.compositionsService.deleteComposition(compositionId).pipe(
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
          })
        );
      })
    )
  );

  deleteCompositionSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(compositionsActions.deleteCompositionSuccess),
        map(({ profile_id }) => {
          this.loadingService.hideLoading('compositions_deleteComposition');
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
        map(async () => {
          this.loadingService.hideLoading('compositions_deleteComposition');
          this.toastService.showToast(false, '??Algo est?? fallando!');
        })
      ),
    { dispatch: false }
  );
}
