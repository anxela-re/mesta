import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducers';
import { IQuery, SharedService } from 'src/app/shared/services/shared.service';
import { apiUrl } from 'src/contants';
import { environment } from 'src/environments/environment';
import { PropertyDTO } from '../models/property.dto';
@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
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

  getProperties(query?: IQuery): Observable<any> {
    return this.http
      .get(
        `${this.apiUrl}/api/properties?${this.sharedService.formatQuery(query)}`
      )
      .pipe(
        catchError(this.sharedService.handleError),
        map((res: any) => res.items)
      );
  }

  createProperty(property: PropertyDTO): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/api/property`, property)
      .pipe(catchError(this.sharedService.handleError));
  }

  updateProperty(property: PropertyDTO): Observable<any> {
    return this.http
      .put(`${this.apiUrl}/api/property`, property)
      .pipe(catchError(this.sharedService.handleError));
  }

  deleteProperty(propertyId: number): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/api/property/${propertyId}`)
      .pipe(catchError(this.sharedService.handleError));
  }
}
