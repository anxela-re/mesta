import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import * as UserActions from '../actions';
import * as AuthActions from '../../auth/actions';
import { UserService } from '../services/user.service';
import { UserDTO } from '../models/user.dto';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { ToastService } from 'src/app/shared/services/toast.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private userService: UserService,
    private store: Store<AppState>,
    private toastService: ToastService
  ) {}
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
          })
        )
      )
    )
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.registerSuccess),
        map(async () => {
          this.toastService.showToast(true, '¡Bienvenido a Mesta!');
          this.router.navigateByUrl('login');
        })
      ),
    { dispatch: false }
  );

  registerFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.registerFailure),
        map(async (error) => {
          const errors: string[] = Object.values(error.payload.error.errors);
          this.toastService.showToast(
            false,
            errors?.length > 0 ? errors[0] : '¡Algo está fallando!'
          );
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

  getUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.getUserFailure),
        map(async () => {
          this.toastService.showToast(false, '¡Algo está fallando!');
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

  updateUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.updateUserFailure),
        map(async () => {
          this.toastService.showToast(false, '¡Algo está fallando!');
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

  deleteUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.deleteUserSuccess),
        map(() => {
          localStorage.clear();
          this.store.dispatch(AuthActions.logout());
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );

  deleteUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.deleteUserFailure),
        map(async () => {
          this.toastService.showToast(false, '¡Algo está fallando!');
        })
      ),
    { dispatch: false }
  );
}
