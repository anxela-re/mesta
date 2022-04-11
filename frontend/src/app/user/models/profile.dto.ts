import { PhaseDTO } from './phase.dto';

export class ProfileDTO {
  id?: string;
  name: string;
  description: string;
  color?: string;
  phases?: PhaseDTO[];
  user_id?: string;

  constructor(
    name: string,
    description: string,
    id?:string,
    phases?: PhaseDTO[],
    color?: string,
    user_id?: string,
  ) {
    this.name = name;
    this.description = description;
    this.phases = phases;
    this.color = color;
    this.id = id;
    this.user_id = user_id;
  }
}

export interface NewProfileDTO {
  name: string;
  description: string;
  user_id: string;
}
