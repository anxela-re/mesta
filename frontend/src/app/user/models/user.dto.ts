import { ProfileDTO } from './profile.dto';

export class UserDTO {
  id?: string;
  access_token?: string;
  name: string;
  email: string;
  profiles: ProfileDTO[] = [];

  constructor(name: string, email: string, profiles: ProfileDTO[] = []) {
    this.name = name;
    this.email = email;
    this.profiles = profiles;
  }
}
