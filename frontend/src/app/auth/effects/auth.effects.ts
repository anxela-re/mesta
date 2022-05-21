import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import * as AuthActions from '../actions';
import { SharedService } from 'src/app/shared/services/shared.service';
import { AuthService } from '../services/auth.service';
import { AuthTokenDTO } from '../models/authToken.dto';
import { TokenService } from '../services/token.service';
import { ProfileSelectedService } from 'src/app/profiles/services/profile-selected.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private sharedService: SharedService,
    private tokenService: TokenService,
    private profileSelectedService: ProfileSelectedService
  ) {}
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      concatMap(({ credentials }) => {
        return this.authService.login(credentials).pipe(
          map((userToken) => {
            const credentialsTemp: AuthTokenDTO = {
              user_id: userToken.id,
              access_token: userToken.access_token,
            };

            this.tokenService.handleData(credentialsTemp);

            return AuthActions.loginSuccess({ credentials: credentialsTemp });
          }),
          catchError((error) => {
            return of(AuthActions.loginFailure({ payload: error }));
          })
        );
      })
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        map(async () => {
          await this.sharedService.managementToast(
            true,
            'Bienvenido/a de nuevo a Mesta'
          );
        })
      ),
    { dispatch: false }
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginFailure),
        map(async (error) => {
          this.sharedService.errorLog(error.payload.error);
          const errors: string[] =
            error.payload.error.errors !== undefined
              ? Object.values(error.payload.error.errors)
              : [error.payload.error.message];
          await this.sharedService.managementToast(
            false,
            errors?.length > 0 && errors[0] !== undefined
              ? errors[0]
              : '¡Algo está fallando!'
          );
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        map(() => {
          this.tokenService.removeToken();
          this.profileSelectedService.removeSelection();
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );
}
