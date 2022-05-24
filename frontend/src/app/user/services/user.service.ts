import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducers';
import { SharedService } from 'src/app/shared/services/shared.service';
import { apiUrl } from 'src/contants';
import { RegisterDTO } from '../models/register.dto';
import { UserDTO } from '../models/user.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
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

  register(user: RegisterDTO): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/api/register`, user)
      .pipe(catchError(this.sharedService.handleError));
  }

  getUser(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/api/user`, {
        headers: this.headers(),
      })
      .pipe(catchError(this.sharedService.handleError));
  }

  updateUser(user: UserDTO): Observable<any> {
    return this.http
      .put(`${this.apiUrl}/api/user`, user)
      .pipe(catchError(this.sharedService.handleError));
  }

  deleteUser(userId: number): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/api/user/${userId}`, {
        headers: this.headers(),
      })
      .pipe(catchError(this.sharedService.handleError));
  }

  headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
    });
  }
}
