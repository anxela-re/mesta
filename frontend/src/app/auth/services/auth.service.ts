import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { catchError } from 'rxjs/operators';
import { SharedService } from 'src/app/shared/services/shared.service';
import { UserDTO } from 'src/app/user/models/user.dto';
import { AuthDTO } from '../models/auth.dto';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { RegisterDTO } from '../../user/models/register.dto';
import { AuthTokenDTO } from '../models/authToken.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'http://127.0.0.1:8000';
  accessToken!: string;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
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
    return this.http.post(
      `${this.apiUrl}/api/logout`,
      {
        headers: this.headers(),
      }
    );
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/forgot`, { email: email });
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/reset`, {
      token: data.token,
      password: data.password,
      password_confirmation: data.password_confirmation,
    });
  }

  headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
    });
  }
}
