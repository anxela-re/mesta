import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
// User interface
export class User {
  name!: String;
  email!: String;
  password!: String;
  password_confirmation!: String;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'http://127.0.0.1:8000';
  constructor(private http: HttpClient, private tokenService: TokenService) {}
  // User registration
  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/register`, user);
  }
  // Login
  login(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/login`, user);
  }
  // Access user profile
  profileUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/user`, {
      headers: this.headers(),
    });
  }

  getclients(): Observable<any> {
    return this.http.get('http://127.0.0.1/8000/oauth/personal-access-tokens');
  }

  logout(allDevices: boolean = false): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/api/logout`,
      { allDevices: allDevices },
      {
        headers: this.headers(),
      }
    );
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/forgot`, { email: email });
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/reset`, {
      token: data.token,
      password: data.password,
      password_confirmation: data.password_confirmation,
    });
  }

  headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.tokenService.getToken()}`,
    });
  }
}
