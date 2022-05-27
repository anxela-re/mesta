import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { apiUrl } from 'src/contants';
import { IContact } from '../models/contact.dto';
import { SharedService } from './shared.service';


@Injectable({
  providedIn: 'root',
})
export class ContactService {
  apiUrl = apiUrl + '/api/contact';

  constructor(private http: HttpClient, private sharedService: SharedService) {}
  contact(data: IContact): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}`, data)
      .pipe(catchError(this.sharedService.handleError));
  }
}
