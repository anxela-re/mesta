import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  exhaustMap,
  finalize,
  map,
  mergeMap,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import * as phasesActions from '../actions';
import * as profilesActions from '../../profiles/actions';
import { SharedService } from 'src/app/shared/services/shared.service';
import { PhasesService } from '../services/phases.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';

@Injectable()
export class PhasesEffects {
  private responseOK: boolean;
  private errorResponse: any;

  constructor(
    private actions$: Actions,
    private phasesService: PhasesService,
    private router: Router,
    private sharedService: SharedService,
    private store: Store<AppState>
  ) {
    this.responseOK = false;
  }
  getPhasesByProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(phasesActions.getPhasesByProfile),
      mergeMap(({ profile_id }) =>
        this.phasesService.getPhases({ profile_id }).pipe(
          map((data) => {
            return phasesActions.getPhasesByProfileSuccess({
              phases: data,
              profile_id,
            });
          }),
          catchError((error) => {
            return of(
              phasesActions.getPhasesByProfileFailure({
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

  getPhasesByProfileSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(phasesActions.getPhasesByProfileSuccess),
        map(({ phases, profile_id }) => {
          this.responseOK = true;
          this.store.dispatch(
            profilesActions.assignPhases({ profile_id, phases })
          );
          this.store.select('profiles').subscribe(({ selected }) => {
            if (selected === profile_id) {
              this.store.dispatch(
                phasesActions.assignCurrentPhases({ phases })
              );
            }
          });
        })
      ),
    { dispatch: false }
  );

  getPhasesByProfileFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(phasesActions.getPhasesByProfileFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );
  createPhase$ = createEffect(() =>
    this.actions$.pipe(
      ofType(phasesActions.createPhase),
      mergeMap(({ phase }) =>
        this.phasesService.createPhase(phase).pipe(
          map((data) => {
            return phasesActions.createPhaseSuccess({
              phase: data.data,
              profile_id: data.data.profile_id,
            });
          }),
          catchError((error) => {
            return of(phasesActions.createPhaseFailure({ payload: error }));
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

  createPhaseSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(phasesActions.createPhaseSuccess),
        map(({ profile_id }) => {
          this.responseOK = true;
          this.store.select('phases').subscribe(({ phases, loaded }) => {
            if (phases && loaded) {
              this.store.dispatch(
                profilesActions.assignPhases({ profile_id, phases })
              );
            }
          });
        })
      ),
    { dispatch: false }
  );

  createPhaseFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(phasesActions.createPhaseFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );
  updatePhase$ = createEffect(() =>
    this.actions$.pipe(
      ofType(phasesActions.updatePhase),
      mergeMap(({ phase }) =>
        this.phasesService.updatePhase(phase).pipe(
          map((data) => {
            return phasesActions.updatePhaseSuccess({
              phase: data.data,
              profile_id: data.data.profile_id,
            });
          }),
          catchError((error) => {
            return of(phasesActions.updatePhaseFailure({ payload: error }));
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

  updatePhaseSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(phasesActions.updatePhaseSuccess),
        map(({ profile_id }) => {
          this.responseOK = true;
          this.store
            .select('phases')
            .subscribe(({ phases }) =>
              this.store.dispatch(
                profilesActions.assignPhases({ profile_id, phases })
              )
            );
        })
      ),
    { dispatch: false }
  );

  updatePhaseFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(phasesActions.updatePhaseFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );
  deletePhase$ = createEffect(() =>
    this.actions$.pipe(
      ofType(phasesActions.deletePhase),
      mergeMap(({ phaseId, profile_id }) =>
        this.phasesService.deletePhase(phaseId).pipe(
          map(() => {
            return phasesActions.deletePhaseSuccess({
              phaseId: phaseId,
              profile_id: profile_id,
            });
          }),
          catchError((error) => {
            return of(phasesActions.deletePhaseFailure({ payload: error }));
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

  deletePhaseSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(phasesActions.deletePhaseSuccess),
        map(({ profile_id }) => {
          this.responseOK = true;
          this.store.select('phases').subscribe(({ phases }) => {
            this.store.dispatch(
              profilesActions.assignPhases({ profile_id, phases })
            );
          });
        })
      ),
    { dispatch: false }
  );

  deletePhaseFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(phasesActions.deletePhaseFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );
}
