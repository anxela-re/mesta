import { PhaseDTO } from './phase.dto';

interface IProfileDTO {
  id?: number;
  name?: string;
  description?: string;
  color?: string;
  phases?: PhaseDTO[];
  user_id?: number;
}
export class ProfileDTO {
  id?: number;
  name: string;
  description: string;
  color?: string;
  phases?: PhaseDTO[];
  user_id?: number;

  constructor({ name = '', description = '', id, phases, color, user_id }: IProfileDTO) {
    this.name = name;
    this.description = description;
    this.phases = phases;
    this.color = color;
    this.id = id;
    this.user_id = user_id;
  }
}

