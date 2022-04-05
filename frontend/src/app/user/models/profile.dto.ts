import { PhaseDTO } from './phase.dto';

export class ProfileDTO {
  id: string = '1';
  name: string;
  description: string;
  color: string;
  phases: PhaseDTO[];

  constructor(
    name: string,
    description: string,
    color: string,
    phases: PhaseDTO[]
  ) {
    this.name = name;
    this.description = description;
    this.color = color;
    this.phases = phases;
  }
}
