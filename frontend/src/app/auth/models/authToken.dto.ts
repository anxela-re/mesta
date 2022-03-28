export class AuthTokenDTO {
  user_id: string;
  access_token: string;

  constructor(user_id?: string, access_token?: string) {
    const userIdStored = localStorage.getItem('user_id') || '';
    const accessTokenStored = localStorage.getItem('access_token') || '';

    this.user_id = user_id || userIdStored;
    this.access_token = access_token || accessTokenStored;
  }
}
