import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducers';
import { SharedService } from 'src/app/shared/services/shared.service';
import { RegisterDTO } from '../models/register.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'http://127.0.0.1:8000';
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

  headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
    });
  }
}
