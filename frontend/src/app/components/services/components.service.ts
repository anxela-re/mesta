import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducers';
import { IQuery, SharedService } from 'src/app/shared/services/shared.service';
import { ComponentDTO } from '../models/component.dto';

@Injectable({
  providedIn: 'root',
})
export class ComponentsService {
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

  getComponents(query?: IQuery): Observable<any> {
    return this.http
      .get(
        `${this.apiUrl}/api/components?${this.sharedService.formatQuery(query)}`
      )
      .pipe(
        catchError(this.sharedService.handleError),
        map((res: any) => res.items)
      );
  }

  createComponent(data: ComponentDTO): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/api/component`, data)
      .pipe(catchError(this.sharedService.handleError));
  }

  updateComponent(data: ComponentDTO): Observable<any> {
    return this.http
      .put(`${this.apiUrl}/api/component`, data)
      .pipe(catchError(this.sharedService.handleError));
  }
  deleteComponent(componentId: number): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/api/component/${componentId}`)
      .pipe(catchError(this.sharedService.handleError));
  }
}
