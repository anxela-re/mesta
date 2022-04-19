export interface IPropertyDTO {
  id: number;
  profile_id: number;
  name: string;
}

export class PropertyDTO {
  id!: number | undefined;
  name!: string | undefined;
  profile_id!: number | undefined;

  constructor(data?: IPropertyDTO) {
    this.id = data?.id;
    this.name = data?.name;
    this.profile_id = data?.profile_id;
  }
}
