import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  concatMap,
  map,
  mergeMap,
  takeUntil,
} from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import * as phasesActions from '../actions';
import * as profilesActions from '../../profiles/actions';
import { PhasesService } from '../services/phases.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { ToastService } from 'src/app/shared/services/toast.service';

@Injectable()
export class PhasesEffects {
  constructor(
    private actions$: Actions,
    private phasesService: PhasesService,
    private toastService: ToastService,
    private store: Store<AppState>
  ) {}
  getPhasesByProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(phasesActions.getPhasesByProfile),
      concatMap(({ profile_id }) =>
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
          this.store.dispatch(
            profilesActions.assignPhases({ profile_id, phases })
          );
          const unsubscribe$ = new Subject<void>();
          this.store
            .select('profiles')
            .pipe(takeUntil(unsubscribe$))
            .subscribe(({ selected }) => {
              if (selected === profile_id) {
                this.store.dispatch(
                  phasesActions.assignCurrentPhases({ phases })
                );
              }
              unsubscribe$.next();
              unsubscribe$.complete();
            });
        })
      ),
    { dispatch: false }
  );

  getPhasesByProfileFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(phasesActions.getPhasesByProfileFailure),
        map(async () => {
          this.toastService.showToast(false, '¡Algo está fallando!');
        })
      ),
    { dispatch: false }
  );
  createPhase$ = createEffect(() =>
    this.actions$.pipe(
      ofType(phasesActions.createPhase),
      concatMap(({ phase }) =>
        this.phasesService.createPhase(phase).pipe(
          map((data) => {
            return phasesActions.createPhaseSuccess({
              phase: data.data,
              profile_id: data.data.profile_id,
            });
          }),
          catchError((error) => {
            return of(phasesActions.createPhaseFailure({ payload: error }));
          })
        )
      )
    )
  );

  createPhaseSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(phasesActions.createPhaseSuccess),
        map(({ profile_id, phase }) => {
          const unsubscribe$ = new Subject<void>();
          this.store
            .select('profiles')
            .pipe(takeUntil(unsubscribe$))
            .subscribe(({ profiles, selected }) => {
              const found = profiles.find(({ id }) => id === profile_id);
              const currentPhases = found?.phases || [];
              this.store.dispatch(
                profilesActions.assignPhases({
                  profile_id,
                  phases: [...currentPhases, phase],
                })
              );
              if (selected === profile_id) {
                this.store.dispatch(
                  phasesActions.assignCurrentPhases({
                    phases: [...currentPhases, phase],
                  })
                );
              }
              unsubscribe$.next();
              unsubscribe$.complete();
            });
        })
      ),
    { dispatch: false }
  );
  createPhaseFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(phasesActions.createPhaseFailure),
        map(async () => {
          this.toastService.showToast(false, '¡Algo está fallando!');
        })
      ),
    { dispatch: false }
  );
  updatePhase$ = createEffect(() =>
    this.actions$.pipe(
      ofType(phasesActions.updatePhase),
      concatMap(({ phase }) =>
        this.phasesService.updatePhase(phase).pipe(
          map((data) => {
            return phasesActions.updatePhaseSuccess({
              phase: data.data,
              profile_id: data.data.profile_id,
            });
          }),
          catchError((error) => {
            return of(phasesActions.updatePhaseFailure({ payload: error }));
          })
        )
      )
    )
  );
  updatePhaseSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(phasesActions.updatePhaseSuccess),
        map(({ profile_id, phase }) => {
          const unsubscribe$ = new Subject<void>();
          this.store
            .select('profiles')
            .pipe(takeUntil(unsubscribe$))
            .subscribe(({ profiles, selected }) => {
              const found = profiles.find(({ id }) => id === profile_id);
              const currentPhases = found?.phases || [];
              const newPhases = currentPhases.map((prop) => {
                if (prop.id === phase.id) {
                  return phase;
                } else {
                  return prop;
                }
              });
              this.store.dispatch(
                profilesActions.assignPhases({
                  profile_id,
                  phases: newPhases,
                })
              );
              if (selected === profile_id) {
                this.store.dispatch(
                  phasesActions.assignCurrentPhases({
                    phases: newPhases,
                  })
                );
              }
              unsubscribe$.next();
              unsubscribe$.complete();
            });
        })
      ),
    { dispatch: false }
  );

  updatePhaseFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(phasesActions.updatePhaseFailure),
        map(async () => {
          this.toastService.showToast(false, '¡Algo está fallando!');
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
          })
        )
      )
    )
  );

  deletePhaseSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(phasesActions.deletePhaseSuccess),
        map(({ profile_id, phaseId }) => {
          const unsubscribe$ = new Subject<void>();
          this.store
            .select('profiles')
            .pipe(takeUntil(unsubscribe$))
            .subscribe(({ profiles, selected }) => {
              const found = profiles.find(({ id }) => id === profile_id);
              const currentPhases = found?.phases || [];
              const newPhases = currentPhases.filter(
                (prop) => prop.id !== phaseId
              );
              this.store.dispatch(
                profilesActions.assignPhases({
                  profile_id,
                  phases: newPhases,
                })
              );
              if (selected === profile_id) {
                this.store.dispatch(
                  phasesActions.assignCurrentPhases({
                    phases: newPhases,
                  })
                );
              }
              unsubscribe$.next();
              unsubscribe$.complete();
            });
        })
      ),
    { dispatch: false }
  );

  deletePhaseFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(phasesActions.deletePhaseFailure),
        map(async () => {
          this.toastService.showToast(false, '¡Algo está fallando!');
        })
      ),
    { dispatch: false }
  );
}
