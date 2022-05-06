import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  exhaustMap,
  finalize,
  map,
  subscribeOn,
} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import * as ProfilesActions from '../actions';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ProfileDTO } from '../models/profile.dto';
import { ProfileService } from '../services/profile.service';
import { PhasesService } from 'src/app/phases/services/phases.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { PhaseDTO } from '../../phases/models/phase.dto';
import * as PropertiesActions from '../../properties/actions';
import * as CompositionsActions from '../../compositions/actions';
import * as PhasesActions from '../../phases/actions';

@Injectable()
export class ProfilesEffects {
  private responseOK: boolean;
  private errorResponse: any;

  constructor(
    private actions$: Actions,
    private router: Router,
    private sharedService: SharedService,
    private profileService: ProfileService,
    private store: Store<AppState>
  ) {
    this.responseOK = false;
  }

  getProfilesByUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfilesActions.getProfilesByUser),
      exhaustMap(({ userId }) =>
        this.profileService.getProfiles({ user_id: userId }).pipe(
          map(({ items }) => {
            let profilesDTO: ProfileDTO[] = items.map(
              (profile: any) => new ProfileDTO(profile)
            );
            return ProfilesActions.getProfilesByUserSuccess({
              profiles: profilesDTO,
            });
          }),
          catchError((error) =>
            of(ProfilesActions.getProfilesByUserFailure({ payload: error }))
          )
        )
      )
    )
  );

  getProfilesByUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfilesActions.getProfilesByUserSuccess),
        map(() => (this.responseOK = true))
      ),
    { dispatch: false }
  );

  getProfilesByUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfilesActions.getProfilesByUserFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  createProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfilesActions.createProfile),
      exhaustMap(({ profile, phases }) => {
        return this.profileService.addProfile(profile).pipe(
          map(({ data }) => {
            let profileDTO: ProfileDTO = new ProfileDTO(data);
            if (phases) {
              // TODO
              // phases.forEach((phase) => {
              //   this.store.dispatch(
              //     PhasesActions.createPhase({
              //       phase: new PhaseDTO({ ...phase, profile_id: data.id }),
              //       profile_id: data.id,
              //     })
              //   );
              // });
            }
            return ProfilesActions.createProfileSuccess({
              profile: profileDTO,
            });
          }),
          catchError((error) => {
            return of(ProfilesActions.createProfileFailure({ payload: error }));
          })
        );
      })
    )
  );

  createProfileSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfilesActions.createProfileSuccess),
        map(() => {
          this.responseOK = true;
          this.router.navigateByUrl('configuration');
        })
      ),
    { dispatch: false }
  );

  createProfileFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfilesActions.createProfileFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfilesActions.updateProfile),
      exhaustMap(({ profile }) =>
        this.profileService.updateProfile(profile).pipe(
          map(({ data }) => {
            let profileDTO: ProfileDTO = new ProfileDTO(data);
            return ProfilesActions.updateProfileSuccess({
              profile: profileDTO,
            });
          }),
          catchError((error) => {
            return of(ProfilesActions.updateProfileFailure({ payload: error }));
          })
        )
      )
    )
  );

  updateProfileSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfilesActions.updateProfileSuccess),
        map(() => {
          this.responseOK = true;
          this.router.navigateByUrl('configuration');
        })
      ),
    { dispatch: false }
  );

  updateProfileFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfilesActions.updateProfileFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  deleteProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfilesActions.deleteProfile),
      exhaustMap(({ profileId }) =>
        this.profileService.deleteProfile(profileId).pipe(
          map(() => {
            return ProfilesActions.deleteProfileSuccess({
              profileId: profileId,
            });
          }),
          catchError((error) => {
            return of(ProfilesActions.deleteProfileFailure({ payload: error }));
          })
        )
      )
    )
  );

  deleteProfileFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfilesActions.deleteProfileFailure),
        map((error) => {
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  selectProfile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfilesActions.selectProfile),
        map(({ profile }) => {
          if (profile?.id && !profile.compositions) {
            this.store.dispatch(
              CompositionsActions.getCompositionsByProfile({
                profile_id: profile.id,
              })
            );
          } else {
            this.store.dispatch(
              CompositionsActions.assignCurrentCompositions({
                compositions: profile.compositions || [],
              })
            );
          }
          if (profile?.id && !profile.properties) {
            this.store.dispatch(
              PropertiesActions.getPropertiesByProfile({
                profile_id: profile.id,
              })
            );
          } else {
            this.store.dispatch(
              PropertiesActions.assignCurrentProperties({
                properties: profile.properties || [],
              })
            );
          }
          if (profile?.id && !profile.phases) {
            this.store.dispatch(
              PhasesActions.getPhasesByProfile({
                profile_id: profile.id,
              })
            );
          } else {
            this.store.dispatch(
              PhasesActions.assignCurrentPhases({
                phases: profile.phases || [],
              })
            );
          }
        })
      ),
    { dispatch: false }
  );
}
