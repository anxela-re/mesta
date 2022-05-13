export interface IPhasesPercentage {
  id: number;
  phase_id: number;
  percentage: number;
  phaseName: string;
  phases_id: number[];
}

export interface IComposition {
  id: number | undefined;
  name: string | undefined;
  profile_id: number | undefined;
  phases_percentage: IPhasesPercentage[] | [];
  phases_id: number[] | [];
}

export class CompositionDTO {
  id!: number | undefined;
  name!: string | undefined;
  profile_id!: number | undefined;
  phases_percentage: IPhasesPercentage[] | undefined = [];
  phases_id: number[] | undefined = [];

  constructor(data?: IComposition) {
    this.id = data?.id;
    this.name = data?.name;
    this.profile_id = data?.profile_id;
    this.phases_percentage = data?.phases_percentage;
    this.phases_id = data?.phases_id;
  }
}
