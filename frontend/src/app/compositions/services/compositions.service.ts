import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducers';
import { IQuery, SharedService } from 'src/app/shared/services/shared.service';
import { environment } from 'src/environments/environment';
import { CompositionDTO } from '../models/composition.dto';

@Injectable({
  providedIn: 'root',
})
export class CompositionsService {
  apiUrl = environment.apiUrl + '/api/compositions';
  accessToken!: string;

  constructor(
    private http: HttpClient,
    private sharedService: SharedService,
    private store: Store<AppState>
  ) {
    this.store.select('auth').subscribe((auth) => {
      console.info('compositions');
      this.accessToken = auth.credentials.access_token;
    });
  }
  getCompositions(query?: IQuery): Observable<any> {
    return this.http
      .get(
        `${this.apiUrl}?${this.sharedService.formatQuery(query)}`
      )
      .pipe(
        catchError(this.sharedService.handleError),
        map((res: any) => res.items)
      );
  }

  createComposition(composition: CompositionDTO): Observable<any> {
    return this.http
      .post(`${this.apiUrl}`, composition)
      .pipe(catchError(this.sharedService.handleError));
  }

  updateComposition(composition: CompositionDTO): Observable<any> {
    return this.http
      .put(`${this.apiUrl}`, composition)
      .pipe(catchError(this.sharedService.handleError));
  }

  deleteComposition(compositionId: number): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/${compositionId}`)
      .pipe(catchError(this.sharedService.handleError));
  }
}
