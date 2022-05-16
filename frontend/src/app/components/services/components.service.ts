import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducers';
import { ProfileSelectedService } from 'src/app/profiles/services/profile-selected.service';
import { IQuery, SharedService } from 'src/app/shared/services/shared.service';
import { environment } from 'src/environments/environment';
import { ComponentDTO } from '../models/component.dto';

@Injectable({
  providedIn: 'root',
})
export class ComponentsService {
  apiUrl = environment.apiUrl;
  accessToken!: string;
  profileSelected!: number;

  constructor(
    private http: HttpClient,
    private sharedService: SharedService,
    private store: Store<AppState>,
    private profileSelectedService: ProfileSelectedService
  ) {
    this.store.select('auth').subscribe((auth) => {
      this.accessToken = auth.credentials.access_token;
    });
    const profileId = this.profileSelectedService.getProfileSelectedStored();
    if (profileId) {
      this.profileSelected = profileId;
    }
  }
  getComponentsByProfile(query?: IQuery): Observable<any> {
    return this.getComponents({ profile_id: this.profileSelected, ...query });
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
