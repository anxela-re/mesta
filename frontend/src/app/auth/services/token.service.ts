import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private issuer = {
    login: 'http://127.0.0.1:8000/api/auth/login',
    register: 'http://127.0.0.1:8000/api/auth/register',
  };
  constructor() {}
  handleData(data: any) {
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('user', JSON.stringify(data));
  }
  getToken() {
    return localStorage.getItem('access_token');
  }

  getUser(): any {
    return localStorage.getItem('user')
      ? localStorage.getItem('user')
      : undefined;
  }
  isValidToken(): boolean {
    let isValid = false;
    const token = this.getToken();
    const userInfo: string = this.getUser();
    let tokenExpiresAt = undefined;
    const currentDate = new Date();
    if (userInfo) {
      const userObj = JSON.parse(userInfo);
      tokenExpiresAt = new Date(userObj.token_expires_at);
    }
    if (
      token &&
      token !== 'undefined' &&
      tokenExpiresAt &&
      tokenExpiresAt > currentDate
    ) {
      isValid = true;
    }
    return isValid;
  }
  isLoggedIn() {
    return this.isValidToken();
  }
  removeToken() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  }
}
