import { PhaseDTO } from 'src/app/user/models/phase.dto';

export interface IPhasesPercentage {
  id: number;
  phase_id: number;
  percentage: number;
}

export interface IComposition {
  id: number | undefined;
  name: string | undefined;
  phasesPercentage: IPhasesPercentage[] | [];
}

export class CompositionDTO {
  id!: number | undefined;
  name!: string | undefined;
  phasesPercentage: IPhasesPercentage[] | undefined = [];

  constructor(data?: IComposition) {
    this.id = data?.id;
    this.name = data?.name;
    this.phasesPercentage = data?.phasesPercentage;
  }
}
