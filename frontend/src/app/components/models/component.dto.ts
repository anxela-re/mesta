export interface IComponent {
  name?: string;
  description?: string;
  image_url?: string;
  phase_id?: number;
  profile_id?: number;
  properties?: any[];
}

export class ComponentDTO {
  name?: string;
  description?: string;
  image_url?: string;
  phase_id?: number;
  profile_id?: number;
  properties?: any[];

  constructor(data?: IComponent) {
    this.name = data?.name;
    this.description = data?.description;
    this.image_url = data?.image_url;
    this.phase_id = data?.phase_id;
    this.profile_id = data?.profile_id;
    this.properties = data?.properties;
  }
}
