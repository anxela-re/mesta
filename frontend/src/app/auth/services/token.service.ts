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
    localStorage.setItem('token_expires_at', data.token_expires_at);
  }
  getToken() {
    return localStorage.getItem('access_token');
  }

  getUserId(): any {
    return localStorage.getItem('user_id')
      ? localStorage.getItem('user_id')
      : undefined;
  }

  getTokenExpirationDate(): any {
    return localStorage.getItem('token_expires_at')
      ? localStorage.getItem('token_expires_at')
      : undefined;
  }

  getProfileSelectedStored(): any {
    return localStorage.getItem('profile_selected');
  }
  isValidToken(): boolean {
    let isValid = false;
    const token = this.getToken();
    const tokenExpirationDate: string = this.getTokenExpirationDate();
    let tokenExpiresAt = undefined;
    const currentDate = new Date();
    if (tokenExpirationDate) {
      tokenExpiresAt = new Date(tokenExpirationDate);
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
  removeToken() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('token_expires_at');
  }
}
