export interface IContact {
  body: string;
  email: string;
  name: string;
}

export class ContactDTO {
  body!: string;
  email!: string;
  name!: string;

  constructor(data?: IContact) {
    this.body = data?.body || '';
    this.email = data?.email || '';
    this.name = data?.name || '';
  }
}
