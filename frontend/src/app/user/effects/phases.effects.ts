import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, finalize, map, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { PhasesActions, ProfilesActions } from '../actions';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ProfileDTO } from '../models/profile.dto';
import { ProfileService } from '../services/profile.service';
import { PhaseService } from '../services/phase.service';
import { PhaseDTO } from '../models/phase.dto';

@Injectable()
export class PhasesEffects {
  private responseOK: boolean;
  private errorResponse: any;

  constructor(
    private actions$: Actions,
    private router: Router,
    private sharedService: SharedService,
    private phaseService: PhaseService
  ) {
    this.responseOK = false;
  }

  getPhasesByUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PhasesActions.getPhasesByProfile),
      exhaustMap(({ profileId }) =>
        this.phaseService.getPhasesByProfile(profileId).pipe(
          map((response) => {
            let phasesDTO: PhaseDTO[] = response.map(
              (phase: any) => new PhaseDTO({ ...phase })
            );
            return PhasesActions.getPhasesByProfileSuccess({
              profileId: profileId,
              phases: phasesDTO,
            });
          }),
          catchError((error) =>
            of(PhasesActions.getPhasesByProfileFailure({ payload: error }))
          )
        )
      )
    )
  );

  getPhasesByProfileSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PhasesActions.getPhasesByProfileSuccess),
        map(() => (this.responseOK = true))
      ),
    { dispatch: false }
  );

  getPhasesByProfileFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PhasesActions.getPhasesByProfileFailure),
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
      ofType(PhasesActions.createPhase),
      mergeMap(({ phase, profileId }) =>
        this.phaseService.createPhase(phase).pipe(
          map(({ data }) => {
            let phaseDTO: PhaseDTO = new PhaseDTO({ ...data });
            return PhasesActions.createPhaseSuccess({
              phase: phaseDTO,
              profileId: profileId,
            });
          }),
          catchError((error) => {
            return of(PhasesActions.createPhaseFailure({ payload: error }));
          })
        )
      )
    )
  );

  createPhaseSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PhasesActions.createPhaseSuccess),
        map(() => {
          this.responseOK = true;
          this.router.navigateByUrl('configuration');
        })
      ),
    { dispatch: false }
  );

  createPhaseFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PhasesActions.createPhaseFailure),
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
      ofType(PhasesActions.updatePhase),
      mergeMap(({ phase, phaseId }) =>
        this.phaseService.updatePhase(phase).pipe(
          map(({ data }) => {
            let phaseDTO: PhaseDTO = new PhaseDTO({ ...data });
            return PhasesActions.updatePhaseSuccess({
              phase: phaseDTO,
              phaseId: phaseId,
            });
          }),
          catchError((error) => {
            return of(PhasesActions.updatePhaseFailure({ payload: error }));
          })
        )
      )
    )
  );

  updatePhaseSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PhasesActions.updatePhaseSuccess),
        map(() => {
          this.responseOK = true;
          this.router.navigateByUrl('configuration');
        })
      ),
    { dispatch: false }
  );

  updatePhaseFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PhasesActions.updatePhaseFailure),
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
      ofType(PhasesActions.deletePhase),
      exhaustMap(({ phaseId }) =>
        this.phaseService.deletePhase(phaseId).pipe(
          map(() => {
            return PhasesActions.deletePhaseSuccess({
              phaseId: phaseId,
            });
          }),
          catchError((error) => {
            return of(PhasesActions.deletePhaseFailure({ payload: error }));
          })
        )
      )
    )
  );

  deletePhaseFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PhasesActions.deletePhaseFailure),
        map((error) => {
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );
}
