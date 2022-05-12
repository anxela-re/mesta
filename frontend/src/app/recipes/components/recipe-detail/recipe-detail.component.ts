import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faPencil,
  faPencilAlt,
  faTrash,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { ComponentDTO } from 'src/app/components/models/component.dto';
import { CompositionDTO } from 'src/app/compositions/models/composition.dto';
import { PropertyDTO } from 'src/app/properties/models/property.dto';
import { IBreadcrumbHistory } from 'src/app/shared/components/breadcrumb/breadcrumb.component';
import { SharedService } from 'src/app/shared/services/shared.service';
import { RecipeDTO } from '../../models/recipe.dto';
import { RecipesService } from '../../services/recipes.service';

interface IComponentWithPercentage {
  component: ComponentDTO;
  percentage: number;
}
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent {
  id!: number;
  recipe!: RecipeDTO;
  breadcrumbHistory: IBreadcrumbHistory[] = [];
  composition!: CompositionDTO | undefined;
  properties: PropertyDTO[] = [];

  faPencil = faPencilAlt;
  faTrash = faTrashAlt;

  compositionsProfile!: CompositionDTO[];
  propertiesProfile!: PropertyDTO[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipesService: RecipesService,
    private sharedService: SharedService,
    private store: Store<AppState>
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    console.info(id);
    if (id) {
      this.id = parseInt(id);
    } else {
      this.router.navigate(['recipes']);
    }
    this.store.select('compositions').subscribe((compositionsState) => {
      console.info('recipe detail');
      if (compositionsState.loaded) {
        this.compositionsProfile = compositionsState.compositions;
        this.getRecipe();
      }
    });
    this.store.select('properties').subscribe((propertiesState) => {
      console.info('recipe detail');
      if (
        propertiesState.loaded &&
        propertiesState.properties !== this.propertiesProfile
      ) {
        this.propertiesProfile = propertiesState.properties;
        this.getRecipe();
      }
    });
  }

  getRecipe(): void {
    if (this.compositionsProfile && this.propertiesProfile) {
      this.recipesService.getRecipes({ id: this.id }).subscribe(
        (data) => {
          this.recipe = data[0];
          this.composition = this.sharedService.getCompositionById(
            this.compositionsProfile,
            this.recipe.composition_id
          );
          this.properties = this.sharedService.getPropertiesById(
            this.propertiesProfile,
            this.recipe.properties
          );
          this.breadcrumbHistory = [
            {
              name: 'Recetas',
              navigateName: 'recipes',
            },
            {
              name: this.recipe.name,
            },
          ];
        },
        (error) => {
          this.sharedService.managementToast(false, '¡Algo está fallando!');
          this.router.navigate(['recipes']);
        }
      );
    }
  }

  edit(): void {
    this.router.navigate(['recipes', 'formulation', this.recipe.id]);
  }

  remove(): void {
    if (this.recipe.id) {
      this.recipesService.deleteRecipe(this.recipe.id).subscribe(
        (data) => this.router.navigate(['recipes']),
        (error) => console.error(error)
      );
    }
  }

  getDefaultQueryComponents() {
    return {
      ids: this.recipe.components.map((c) => c.component_id).join(','),
    };
  }
}
