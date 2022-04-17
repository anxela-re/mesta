import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducers';
import { IQuery, SharedService } from 'src/app/shared/services/shared.service';
import { PhaseDTO } from '../models/phase.dto';

@Injectable({
  providedIn: 'root',
})
export class PhaseService {
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

  getPhases(query: IQuery): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/api/phases?${this.sharedService.formatQuery(query)}`)
      .pipe(catchError(this.sharedService.handleError));
  }

  createPhase(phase: PhaseDTO): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/api/phase`, phase)
      .pipe(catchError(this.sharedService.handleError));
  }

  updatePhase(phase: PhaseDTO): Observable<any> {
    return this.http
      .put(`${this.apiUrl}/api/phase`, phase)
      .pipe(catchError(this.sharedService.handleError));
  }

  deletePhase(phaseId: number): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/api/phase/${phaseId}`)
      .pipe(catchError(this.sharedService.handleError));
  }

  headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
    });
  }
}
