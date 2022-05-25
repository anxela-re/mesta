import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducers';
import { IQuery, SharedService } from 'src/app/shared/services/shared.service';
import { apiUrl } from 'src/contants';
import { ProfileDTO } from '../models/profile.dto';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
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

  addProfile(profile: ProfileDTO): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/api/profile`, profile)
      .pipe(catchError(this.sharedService.handleError));
  }

  updateProfile(profile: ProfileDTO): Observable<any> {
    return this.http
      .put(`${this.apiUrl}/api/profile`, profile)
      .pipe(catchError(this.sharedService.handleError));
  }

  getProfiles(query: IQuery): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/api/profiles?${this.sharedService.formatQuery(query)}`)
      .pipe(catchError(this.sharedService.handleError));
  }

  deleteProfile(profileId: number): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/api/profile/${profileId}`)
      .pipe(catchError(this.sharedService.handleError));
  }

  headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
    });
  }
}
