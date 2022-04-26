import { CompositionDTO } from 'src/app/compositions/models/composition.dto';

export interface IRecipe {
    id?: number;
    name?: string;
    description?: string;
    profile_id?: number;
    properties?: any[];
    composition_id?: number;
  }
  
  export class RecipeDTO {
    id?: number;
    name?: string;
    description?: string;
    profile_id?: number;
    properties?: any[];
    composition_id?: number;
  
    constructor(data?: IRecipe) {
      this.id = data?.id;
      this.name = data?.name;
      this.description = data?.description;
      this.profile_id = data?.profile_id;
      this.properties = data?.properties;
      this.composition_id = data?.composition_id;
    }
  }
  