import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, finalize, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ProfilesActions } from '../actions';
import { SharedService } from 'src/app/shared/services/shared.service';
import { UserService } from '../services/user.service';
import { UserDTO } from '../models/user.dto';
import { ProfileDTO } from '../models/profile.dto';

@Injectable()
export class ProfilesEffects {
  private responseOK: boolean;
  private errorResponse: any;

  constructor(
    private actions$: Actions,
    private router: Router,
    private sharedService: SharedService,
    private userService: UserService
  ) {
    this.responseOK = false;
  }

  getProfilesByUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfilesActions.getProfilesByUser),
      exhaustMap(({ userId }) =>
        this.userService.getProfilesByUser(userId).pipe(
          map((response) => {
            let profilesDTO: ProfileDTO[] = response.map(
              (profile: any) =>
                new ProfileDTO(
                  profile.name,
                  profile.description,
                  profile.id,
                  undefined,
                  undefined,
                  profile.user_id
                )
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
      exhaustMap(({ profile }) =>
        this.userService.addProfile(profile).pipe(
          map(({data}) => {
            let profileDTO: ProfileDTO = new ProfileDTO(
              data.name,
              data.description,
              data.id,
              undefined,
              undefined,
              data.user_id
            );
            return ProfilesActions.createProfileSuccess({
              profile: profileDTO,
            });
          })
        )
      )
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
        this.userService.updateProfile(profile).pipe(
          map(({data}) => {
            let profileDTO: ProfileDTO = new ProfileDTO(
              data.name,
              data.description,
              data.id,
              undefined,
              undefined,
              data.user_id
            );
            return ProfilesActions.updateProfileSuccess({
              profile: profileDTO,
            });
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
}
