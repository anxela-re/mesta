import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { AppState } from 'src/app/app.reducers';
import * as AuthActions from 'src/app/auth/actions';
import { TokenService } from 'src/app/auth/services/token.service';
import { ProfileSelectedService } from 'src/app/user/services/profile-selected.service';

export type IQuery = {
  [key: string]: string | number | string[];
};
export interface ResponseError {
  error: string;
}

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(
    private store: Store<AppState>,
    private tokenService: TokenService,
    private profileSelectedService: ProfileSelectedService
  ) {}

  async managementToast(
    element: string,
    validRequest: boolean,
    error?: ResponseError
  ): Promise<void> {
    const toastMsg = document.getElementById(element);
    if (toastMsg) {
      if (validRequest) {
        toastMsg.className = 'show requestOk';
        toastMsg.textContent = 'Form submitted successfully.';
        await this.wait(2500);
        toastMsg.className = toastMsg.className.replace('show', '');
      } else {
        toastMsg.className = 'show requestKo';
        // if (error?.messageDetail) {
        //   toastMsg.textContent =
        //     'Error on form submitted, show logs. Message: ' +
        //     error?.message +
        //     '. Message detail: ' +
        //     error?.messageDetail +
        //     '. Status code: ' +
        //     error?.statusCode;
        // } else {
        //   toastMsg.textContent =
        //     'Error on form submitted, show logs. Message: ' +
        //     error?.message +
        //     '. Status code: ' +
        //     error?.statusCode;
        // }

        await this.wait(2500);
        toastMsg.className = toastMsg.className.replace('show', '');
      }
    }
  }

  errorLog(error: ResponseError): void {
    console.error(error);
    if (error.error.includes('Unauthenticated')) {
      // this.tokenService.removeToken();
      // this.profileSelectedService.removeSelection();
      // this.store.dispatch(AuthActions.logout());
    }
  }

  async wait(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  formatQuery(query?: IQuery): string {
    let queryString = '';
    console.info(query)
    if (query) {
      Object.keys(query).forEach((q) => {
        if (query[q] && query[q] !== '') {
          queryString = queryString.concat(`${q}=${encodeURIComponent(`${query[q]}`)}`, '&');
        }
      });
    }
    return queryString.slice(0, -1);
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
