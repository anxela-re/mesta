export interface IPhaseDTO {
  id?: number;
  profile_id?: number;
  name?: string;
  color?: string;
  description?: string;
}
export class PhaseDTO {
  id?: number;
  profile_id?: number;
  name?: string;
  color?: string;
  description?: string;

  constructor({ id, profile_id, name, color, description = '' }: IPhaseDTO) {
    this.name = name;
    this.color = color;
    this.id = id;
    this.profile_id = profile_id;
    this.description = description;
  }
}
