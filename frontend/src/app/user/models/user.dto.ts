import { ProfileDTO } from './profile.dto';

export class UserDTO {
  id?: number;
  access_token?: string;
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}
