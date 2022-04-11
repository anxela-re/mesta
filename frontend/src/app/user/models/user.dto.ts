import { ProfileDTO } from './profile.dto';

export class UserDTO {
  id?: string;
  access_token?: string;
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}
