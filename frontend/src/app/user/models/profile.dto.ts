import { PhaseDTO } from './phase.dto';

export class ProfileDTO {
  id?: number;
  name: string;
  description: string;
  color?: string;
  phases: PhaseDTO[] = [];
  user_id?: number;

  constructor(
    name: string,
    description: string,
    id?: number,
    phases: PhaseDTO[] = [],
    color?: string,
    user_id?: number
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
  user_id: number;
}
