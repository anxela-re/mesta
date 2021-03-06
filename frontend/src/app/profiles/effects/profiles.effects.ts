import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import * as ProfilesActions from '../actions';
import { ProfileDTO } from '../models/profile.dto';
import { ProfileService } from '../services/profile.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as PropertiesActions from '../../properties/actions';
import * as CompositionsActions from '../../compositions/actions';
import * as PhasesActions from '../../phases/actions';
import { ToastService } from 'src/app/shared/services/toast.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Injectable()
export class ProfilesEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private toastService: ToastService,
    private profileService: ProfileService,
    private store: Store<AppState>,
    private loadingService: LoadingService
  ) {}

  getProfilesByUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfilesActions.getProfilesByUser),
      mergeMap(({ userId }) =>
        this.profileService.getProfiles({ user_id: userId }).pipe(
          map(({ items }) => {
            this.loadingService.showLoading('profiles_getProfilesByUser');
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
        map(({ profiles }) => {
          this.loadingService.hideLoading('profiles_getProfilesByUser');
          if (profiles.length === 0) {
            this.router.navigate(['configuration','profile', 'new']);
          } else {
            profiles.forEach((profile) => {
              if (profile.id) {
                this.store.dispatch(
                  PhasesActions.getPhasesByProfile({ profile_id: profile.id })
                );
              }
            });
          }
        })
      ),
    { dispatch: false }
  );

  getProfilesByUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfilesActions.getProfilesByUserFailure),
        map(() => {
          this.loadingService.hideLoading('profiles_getProfilesByUser');
          this.toastService.showToast(false, '??Algo est?? fallando!');
        })
      ),
    { dispatch: false }
  );

  createProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfilesActions.createProfile),
      concatMap(({ profile, phases }) => {
        this.loadingService.showLoading('profiles_createProfile');
        return this.profileService.addProfile(profile).pipe(
          map(({ data }) => {
            let profileDTO: ProfileDTO = new ProfileDTO(data);
            return ProfilesActions.createProfileSuccess({
              profile: profileDTO,
              phases: phases,
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
        map(({ phases, profile }) => {
          this.loadingService.hideLoading('profiles_createProfile');
          phases?.forEach((phase) => {
            this.store.dispatch(
              PhasesActions.createPhase({
                phase: { ...phase, profile_id: profile.id },
              })
            );
          });
          this.router.navigateByUrl('configuration');
        })
      ),
    { dispatch: false }
  );

  createProfileFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfilesActions.createProfileFailure),
        map(() => {
          this.loadingService.hideLoading('profiles_createProfile');
          this.toastService.showToast(false, '??Algo est?? fallando!');
        })
      ),
    { dispatch: false }
  );

  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfilesActions.updateProfile),
      mergeMap(({ profile }) => {
        this.loadingService.showLoading('profiles_updateProfile');
        return this.profileService.updateProfile(profile).pipe(
          map(({ data }) => {
            let profileDTO: ProfileDTO = new ProfileDTO(data);
            return ProfilesActions.updateProfileSuccess({
              profile: profileDTO,
            });
          }),
          catchError((error) => {
            return of(ProfilesActions.updateProfileFailure({ payload: error }));
          })
        );
      })
    )
  );

  updateProfileSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfilesActions.updateProfileSuccess),
        map(() => {
          this.loadingService.hideLoading('profiles_updateProfile');
          this.router.navigateByUrl('configuration');
        })
      ),
    { dispatch: false }
  );

  updateProfileFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfilesActions.updateProfileFailure),
        map(() => {
          this.loadingService.hideLoading('profiles_updateProfile');
          this.toastService.showToast(false, '??Algo est?? fallando!');
        })
      ),
    { dispatch: false }
  );

  deleteProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfilesActions.deleteProfile),
      mergeMap(({ profileId }) => {
        this.loadingService.showLoading('profiles_deleteProfile');
        return this.profileService.deleteProfile(profileId).pipe(
          map(() => {
            return ProfilesActions.deleteProfileSuccess({
              profileId: profileId,
            });
          }),
          catchError((error) => {
            return of(ProfilesActions.deleteProfileFailure({ payload: error }));
          })
        );
      })
    )
  );

  deleteProfileSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfilesActions.deleteProfileSuccess),
        map(() => {
          this.loadingService.hideLoading('profiles_deleteProfile');
        })
      ),
    { dispatch: false }
  );

  deleteProfileFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfilesActions.deleteProfileFailure),
        map(() => {
          this.loadingService.hideLoading('profiles_deleteProfile');
          this.toastService.showToast(false, '??Algo est?? fallando!');
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
          const currentPath = this.router.url
            .split('/')
            .filter((v) => v !== '');
          if (currentPath.length > 1) {
            this.router.navigate([currentPath[0]]);
          }
        })
      ),
    { dispatch: false }
  );
}
