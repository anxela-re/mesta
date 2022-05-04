import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, finalize, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import * as phasesActions from '../actions';
import * as profilesActions from '../../profiles/actions';
import { SharedService } from 'src/app/shared/services/shared.service';
import { PhasesService } from '../services/phases.service';

@Injectable()
export class PhasesEffects {
  private responseOK: boolean;
  private errorResponse: any;

  constructor(
    private actions$: Actions,
    private phasesService: PhasesService,
    private router: Router,
    private sharedService: SharedService
  ) {
    this.responseOK = false;
  }
  getPhasesByProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(phasesActions.getPhasesByProfile),
      exhaustMap(({ profile_id }) =>
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
        map(() => {
          this.responseOK = true;
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
      exhaustMap(({ phase }) =>
        this.phasesService.createPhase(phase).pipe(
          map((data) => {
            return phasesActions.createPhaseSuccess({
              phase: data.data,
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
        map(() => {
          this.responseOK = true;
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
      exhaustMap(({ phase }) =>
        this.phasesService.updatePhase(phase).pipe(
          map((data) => {
            return phasesActions.updatePhaseSuccess({
              phase: data.data,
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
        map(() => {
          this.responseOK = true;
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
      exhaustMap(({ phaseId }) =>
        this.phasesService.deletePhase(phaseId).pipe(
          map(() => {
            return phasesActions.deletePhaseSuccess({
              phaseId: phaseId,
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
        map(() => {
          this.responseOK = true;
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
