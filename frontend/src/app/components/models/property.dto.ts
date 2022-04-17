export interface IProperty {
  name: string;
  profile_id: number;
}

export class PropertyDTO {
  name?: string;
  profile_id?: number;
  
  constructor(data: IProperty) {
    this.name = data.name;
    this.profile_id = data.profile_id;
  }
}
