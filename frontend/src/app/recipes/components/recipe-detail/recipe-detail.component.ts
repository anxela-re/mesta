import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { finalize } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducers';
import { CompositionDTO } from 'src/app/compositions/models/composition.dto';
import { PropertyDTO } from 'src/app/properties/models/property.dto';
import { IBreadcrumbHistory } from 'src/app/shared/components/breadcrumb/breadcrumb.component';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { RecipeDTO } from '../../models/recipe.dto';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
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
    private toastService: ToastService,
    private modalService: ModalService,
    private store: Store<AppState>,
    private loadingService: LoadingService
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = parseInt(id);
    }
    this.store.select('compositions').subscribe((compositionsState) => {
      if (compositionsState.loaded) {
        this.compositionsProfile = compositionsState.compositions;
        this.getRecipe();
      }
    });
    this.store.select('properties').subscribe((propertiesState) => {
      if (
        propertiesState.loaded &&
        propertiesState.properties !== this.propertiesProfile
      ) {
        this.propertiesProfile = propertiesState.properties;
        this.getRecipe();
      }
    });
  }

  getIdModal(): string {
    return 'recipe-delete-' + this.recipe?.id;
  }
  getRecipe(): void {
    if (this.compositionsProfile && this.propertiesProfile) {
      this.loadingService.showLoading('recipe_detail_getRecipes');
      this.recipesService
        .getRecipes({ id: this.id })
        .pipe(
          finalize(() =>
            this.loadingService.hideLoading('recipe_detail_getRecipes')
          )
        )
        .subscribe(
          (data) => {
            if (data.length === 0) {
              this.router.navigate(['recipes']);
            }
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
            console.error(error);
            this.toastService.showToast(false, '¡Algo está fallando!');
            this.router.navigate(['recipes']);
          }
        );
    }
  }

  edit(): void {
    this.router.navigate(['recipes', 'formulation', this.recipe.id]);
  }

  delete(): void {
    this.modalService.openModal(
      this.getIdModal(),
      '¡Cuidado!',
      'Una vez eliminada, no podrá recuperar la receta ¿Está seguro que quiere eliminarla?'
    );
  }
  deleteRecipeConfirm(): void {
    if (this.recipe.id) {
      this.loadingService.showLoading('recipe_detail_deleteRecipe');
      this.recipesService
        .deleteRecipe(this.recipe.id)
        .pipe(
          finalize(() =>
            this.loadingService.hideLoading('recipe_detail_deleteRecipe')
          )
        )
        .subscribe(
          () => this.router.navigate(['recipes']),
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
