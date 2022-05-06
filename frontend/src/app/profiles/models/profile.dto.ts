import { CompositionDTO } from 'src/app/compositions/models/composition.dto';
import { PropertyDTO } from 'src/app/properties/models/property.dto';
import { PhaseDTO } from '../../phases/models/phase.dto';

interface IProfileDTO {
  id?: number;
  name?: string;
  description?: string;
  color?: string;
  phases?: PhaseDTO[];
  user_id?: number;
  properties?: PropertyDTO[];
  compositions?: CompositionDTO[];
}
export class ProfileDTO {
  id?: number;
  name: string;
  description: string;
  color?: string;
  phases?: PhaseDTO[];
  user_id?: number;
  properties?: PropertyDTO[];
  compositions?: CompositionDTO[];

  constructor(data: IProfileDTO) {
    this.name = data.name || '';
    this.description = data.description || '';
    this.phases = data.phases;
    this.color = data.color;
    this.id = data.id;
    this.user_id = data.user_id;
    this.properties = data.properties;
    this.compositions = data.compositions;
  }
}
