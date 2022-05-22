export class AuthDTO {
  id: string;
  access_token: string;
  email: string;
  password: string;
  token_expires_at: string;

  constructor(
    id: string,
    access_token: string,
    email: string,
    password: string,
    token_expires_at: string
  ) {
    this.id = id;
    this.access_token = access_token;
    this.email = email;
    this.password = password;
    this.token_expires_at = token_expires_at;
  }
}
