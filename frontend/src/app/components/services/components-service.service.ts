import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducers';
import { SharedService } from 'src/app/shared/services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class ComponentsServiceService {
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

  
  getComponent(id: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/api/component`)
      .pipe(catchError(this.sharedService.handleError));
  }

}
