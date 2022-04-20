export interface IComponent {
  name?: string;
  scientific_name?: string;
  description?: string;
  image_url?: string;
  phase_id?: number;
  profile_id?: number;
  properties?: any[];
  expiration_date?: Date;
}

export class ComponentDTO {
  name?: string;
  scientific_name?: string;
  description?: string;
  image_url?: string;
  phase_id?: number;
  profile_id?: number;
  properties?: any[];
  expiration_date?: Date;

  constructor(data?: IComponent) {
    this.name = data?.name;
    this.scientific_name = data?.scientific_name;
    this.description = data?.description;
    this.image_url = data?.image_url;
    this.phase_id = data?.phase_id;
    this.profile_id = data?.profile_id;
    this.properties = data?.properties;
    this.expiration_date = data?.expiration_date;
  }
}
