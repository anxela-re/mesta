import { Injectable } from '@angular/core';
import { AuthTokenDTO } from '../models/authToken.dto';
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}
  handleData(data: AuthTokenDTO) {
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('user_id', data.user_id);
  }
  getToken() {
    return localStorage.getItem('access_token');
  }

  getUserId(): any {
    return localStorage.getItem('user_id')
      ? localStorage.getItem('user_id')
      : undefined;
  }
  getProfileSelected(): any {
    return localStorage.getItem('profile_selected');
  }
  isValidToken(): boolean {
    let isValid = false;
    const token = this.getToken();
    const userInfo: string = this.getUserId();
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
    localStorage.removeItem('user_id');
  }
}
