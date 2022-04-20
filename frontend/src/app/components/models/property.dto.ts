export interface IProperty {
  id: number;
  name: string;
  profile_id: number;
}

export class PropertyDTO {
  id?: number;
  name?: string;
  profile_id?: number;
  
  constructor(data: IProperty) {
    this.id = data.id;
    this.name = data.name;
    this.profile_id = data.profile_id;
  }
}
