import { ComponentDTO } from 'src/app/components/models/component.dto';
import { CompositionDTO } from 'src/app/compositions/models/composition.dto';
export interface IComponentPercentage {
  component_id: number;
  percentage: number;
}
export interface IRecipe {
  id?: number;
  name?: string;
  description?: string;
  profile_id?: number;
  properties?: number[];
  composition_id?: number;
  components?: IComponentPercentage[];
}

export class RecipeDTO {
  id?: number;
  name?: string;
  description?: string;
  profile_id?: number;
  properties: number[] = [];
  composition_id?: number;
  components: IComponentPercentage[] = [];

  constructor(data?: IRecipe) {
    this.id = data?.id;
    this.name = data?.name;
    this.description = data?.description;
    this.profile_id = data?.profile_id;
    this.properties = data?.properties || [];
    this.composition_id = data?.composition_id;
    this.components = data?.components || [];
  }
}
