import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, finalize, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { UserActions } from '../actions';
import * as AuthActions from '../../auth/actions';
import { SharedService } from 'src/app/shared/services/shared.service';
import { UserService } from '../services/user.service';
import { UserDTO } from '../models/user.dto';
import { ProfileDTO } from '../models/profile.dto';

@Injectable()
export class UserEffects {
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
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.register),
      exhaustMap(({ user }) =>
        this.userService.register(user).pipe(
          map((user) => {
            return UserActions.registerSuccess({ user: user });
          }),
          catchError((error) => {
            return of(UserActions.registerFailure({ payload: error }));
          }),
          finalize(async () => {
            await this.sharedService.managementToast(
              'registerFeedback',
              this.responseOK,
              this.errorResponse
            );

            if (this.responseOK) {
              this.router.navigateByUrl('login');
            }
          })
        )
      )
    )
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.registerSuccess),
        map(() => {
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );

  registerFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.registerFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUser),
      exhaustMap(() =>
        this.userService.getUser().pipe(
          map((user) => {
            const userDTO: UserDTO = {
              id: user.id,
              name: user.name,
              email: user.email,
            };
            return UserActions.getUserSuccess({
              user: userDTO,
            });
          }),
          catchError((error) => {
            return of(UserActions.getUserFailure({ payload: error }));
          })
        )
      )
    )
  );

  getUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.getUserSuccess),
        map(() => (this.responseOK = true))
      ),
    { dispatch: false }
  );

  getUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.getUserFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      exhaustMap(({ user }) =>
        this.userService.updateUser(user).pipe(
          map(({ data }) => {
            return UserActions.updateUserSuccess({ user: data });
          }),
          catchError((error) => {
            return of(UserActions.updateUserFailure({ payload: error }));
          })
        )
      )
    )
  );

  updateUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.updateUserSuccess),
        map(() => {
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );

  updateUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.updateUserFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );
  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      exhaustMap(({ userId }) =>
        this.userService.deleteUser(userId).pipe(
          map(() => {
            return UserActions.deleteUserSuccess({ userId: userId });
          }),
          catchError((error) => {
            return of(UserActions.deleteUserFailure({ payload: error }));
          })
        )
      )
    )
  );

  deleteUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.deleteUserFailure),
        map((error) => {
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );
}
