import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducers';
import { IQuery, SharedService } from 'src/app/shared/services/shared.service';
import { environment } from 'src/environments/environment';
import { PhaseDTO } from '../models/phase.dto';
@Injectable({
  providedIn: 'root',
})
export class PhasesService {
  apiUrl = environment.apiUrl;
  accessToken!: string;
  constructor(
    private http: HttpClient,
    private sharedService: SharedService,
    private store: Store<AppState>
  ) {
    this.store.select('auth').subscribe((auth) => {
      console.info('phases');
      this.accessToken = auth.credentials.access_token;
    });
  }

  getPhases(query?: IQuery): Observable<any> {
    return this.http
      .get(
        `${this.apiUrl}/api/phases?${this.sharedService.formatQuery(query)}`
      )
      .pipe(
        catchError(this.sharedService.handleError),
        map((res: any) => res.items)
      );
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
}
