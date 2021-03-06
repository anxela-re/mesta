import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { SharedService } from 'src/app/shared/services/shared.service';
import { AuthDTO } from '../models/auth.dto';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { apiUrl } from 'src/contants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = apiUrl;
  accessToken!: string;

  constructor(
    private http: HttpClient,
    private sharedService: SharedService,
    private store: Store<AppState>
  ) {
    this.store.select('auth').subscribe((auth) => {
      this.accessToken = auth.credentials.access_token;
    });
  }
  login(auth: AuthDTO): Observable<AuthDTO> {
    return this.http
      .post<any>(`${this.apiUrl}/api/login`, auth)
      .pipe(catchError(this.sharedService.handleError));
  }

  logout(): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/api/logout`, {
        headers: this.headers(),
      })
  }

  forgotPassword(email: string): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/api/forgot`, { email: email })
      .pipe(catchError(this.sharedService.handleError));
  }

  resetPassword(data: any): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/api/reset`, {
        token: data.token || this.accessToken,
        password: data.password,
        password_confirmation: data.password_confirmation,
      })
      .pipe(catchError(this.sharedService.handleError));
  }

  headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
    });
  }
}
