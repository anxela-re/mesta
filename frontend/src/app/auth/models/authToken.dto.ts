export class AuthTokenDTO {
  user_id: string;
  access_token: string;
  token_expires_at: string;

  constructor(
    user_id?: string,
    access_token?: string,
    token_expires_at?: string
  ) {
    const userIdStored = localStorage.getItem('user_id') || '';
    const accessTokenStored = localStorage.getItem('access_token') || '';
    const tokenExpirationStored =
      localStorage.getItem('token_expires_at') || '';

    this.user_id = user_id || userIdStored;
    this.access_token = access_token || accessTokenStored;
    this.token_expires_at = token_expires_at || tokenExpirationStored;

  }
}
