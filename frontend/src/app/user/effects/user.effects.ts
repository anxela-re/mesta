import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import * as UserActions from '../actions';
import * as AuthActions from '../../auth/actions';
import { UserService } from '../services/user.service';
import { UserDTO } from '../models/user.dto';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { ToastService } from 'src/app/shared/services/toast.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private userService: UserService,
    private store: Store<AppState>,
    private toastService: ToastService,
    private loadingService: LoadingService
  ) {}
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.register),
      exhaustMap(({ user }) => {
        this.loadingService.showLoading('user_register');
        return this.userService.register(user).pipe(
          map((user) => {
            return UserActions.registerSuccess({ user: user });
          }),
          catchError((error) => {
            return of(UserActions.registerFailure({ payload: error }));
          })
        );
      })
    )
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.registerSuccess),
        map(async () => {
          this.loadingService.hideLoading('user_register');
          this.toastService.showToast(
            true,
            '¡Gracias por registrarte en Mesta!'
          );
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
          this.loadingService.hideLoading('user_register');
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
      exhaustMap(() => {
        this.loadingService.showLoading('user_getUser');
        return this.userService.getUser().pipe(
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
        );
      })
    )
  );

  getUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.getUserSuccess),
        concatMap(async () => {
          console.info('getUserSuccess')
          this.loadingService.hideLoading('user_getUser');
        })
      ),
    { dispatch: false }
  );

  getUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.getUserFailure),
        concatMap(async () => {
          this.loadingService.hideLoading('user_getUser');
          this.toastService.showToast(false, '¡Algo está fallando!');
        })
      ),
    { dispatch: false }
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      exhaustMap(({ user }) => {
        this.loadingService.showLoading('user_updateUser');
        return this.userService.updateUser(user).pipe(
          map(({ data }) => {
            return UserActions.updateUserSuccess({ user: data });
          }),
          catchError((error) => {
            return of(UserActions.updateUserFailure({ payload: error }));
          })
        );
      })
    )
  );

  updateUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.updateUserSuccess),
        map(async () => {
          this.loadingService.hideLoading('user_updateUser');
        })
      ),
    { dispatch: false }
  );

  updateUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.updateUserFailure),
        map(async () => {
          this.loadingService.hideLoading('user_updateUser');
          this.toastService.showToast(false, '¡Algo está fallando!');
        })
      ),
    { dispatch: false }
  );
  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      exhaustMap(({ userId }) => {
        this.loadingService.showLoading('user_deleteUser');
        return this.userService.deleteUser(userId).pipe(
          map(() => {
            return UserActions.deleteUserSuccess({ userId: userId });
          }),
          catchError((error) => {
            return of(UserActions.deleteUserFailure({ payload: error }));
          })
        );
      })
    )
  );

  deleteUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.deleteUserSuccess),
        map(() => {
          this.loadingService.hideLoading('user_deleteUser');
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
          this.loadingService.hideLoading('user_deleteUser');
          this.toastService.showToast(false, '¡Algo está fallando!');
        })
      ),
    { dispatch: false }
  );
}
