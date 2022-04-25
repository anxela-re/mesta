export interface IRecipe {
    id?: number;
    name?: string;
    description?: string;
    profile_id?: number;
    properties?: any[];
  }
  
  export class RecipeDTO {
    id?: number;
    name?: string;
    description?: string;
    profile_id?: number;
    properties?: any[];
  
    constructor(data?: IRecipe) {
      this.id = data?.id;
      this.name = data?.name;
      this.description = data?.description;
      this.profile_id = data?.profile_id;
      this.properties = data?.properties;
    }
  }
  