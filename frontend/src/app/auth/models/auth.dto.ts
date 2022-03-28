export class AuthDTO {
  id: string;
  access_token: string;
  email: string;
  password: string;

  constructor(
    id: string,
    access_token: string,
    email: string,
    password: string
  ) {
    this.id = id;
    this.access_token = access_token;
    this.email = email;
    this.password = password;
  }
}
