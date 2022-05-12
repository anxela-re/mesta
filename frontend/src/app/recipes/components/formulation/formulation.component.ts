import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { ComponentDTO } from 'src/app/components/models/component.dto';
import { CompositionDTO } from 'src/app/compositions/models/composition.dto';
import { PropertyDTO } from 'src/app/properties/models/property.dto';
import { IBreadcrumbHistory } from 'src/app/shared/components/breadcrumb/breadcrumb.component';
import { PhaseDTO } from 'src/app/phases/models/phase.dto';
import { RecipeDTO } from '../../models/recipe.dto';
import { RecipesService } from '../../services/recipes.service';
export function additionValidator(value: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const suma = control.value.reduce(
      (acc: number, curr: any) => acc + curr?.percentage,
      0
    );
    return suma === value ? null : { additionValidator: suma };
  };
}
@Component({
  selector: 'app-formulation',
  templateUrl: './formulation.component.html',
  styleUrls: ['./formulation.component.scss'],
})
export class FormulationComponent implements OnInit {
  recipeId!: number;
  recipe!: RecipeDTO;
  propertiesProfile!: PropertyDTO[];
  properties: PropertyDTO[] = [];
  profile_id!: number;
  phases!: PhaseDTO[];
  selectedComposition!: CompositionDTO;

  formulationForm!: FormGroup;
  name!: FormControl;
  description!: FormControl;
  composition_id!: FormControl;

  breadcrumbHistory: IBreadcrumbHistory[] = [];
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private recipesService: RecipesService,
    private router: Router
  ) {
    const recipeId = this.route.snapshot.paramMap.get('id');
    if (recipeId) {
      this.recipeId = parseInt(recipeId);
    }

    this.store.select('profiles').subscribe(({ profiles, selected }) => {
      console.info('formulation');
      if (selected) {
        this.profile_id = selected;
        this.initForm();
      }
    });
    this.store.select('phases').subscribe(({ phases, loaded }) => {
      console.info('formulation');
      if (loaded) {
        this.phases = phases;
        this.initForm();
      }
    });
    this.store.select('properties').subscribe(({ properties, loaded }) => {
      console.info('formulation');
      if (
        loaded &&
        JSON.stringify(properties) !== JSON.stringify(this.propertiesProfile)
      ) {
        this.propertiesProfile = properties;
        this.initForm();
      }
    });
  }

  ngOnInit(): void {
    if (this.recipeId) {
      this.recipesService
        .getRecipes({ id: this.recipeId })
        .subscribe((items) => {
          this.recipe = items[0];
          this.breadcrumbHistory = [
            {
              name: 'Recetas',
              navigateName: 'recipes',
            },
            {
              name: this.recipe.name,
            },
          ];
          this.initForm();
        });
    } else {
      this.recipe = new RecipeDTO({
        profile_id: this.profile_id,
      });
      this.breadcrumbHistory = [
        {
          name: 'Recetas',
          navigateName: 'recipes',
        },
        {
          name: 'Nueva receta',
        },
      ];
      this.initForm();
    }
  }

  initForm() {
    console.info('formulation');
    if (
      this.recipe &&
      this.phases &&
      this.profile_id &&
      this.propertiesProfile
    ) {
      this.name = new FormControl(this.recipe.name, [
        Validators.required,
        Validators.maxLength(64),
      ]);
      this.description = new FormControl(this.recipe.description);
      this.composition_id = new FormControl(this.recipe.composition_id);

      this.formulationForm = this.fb.group({
        name: this.name,
        description: this.description,
        composition_id: this.composition_id,
        components: this.fb.array(
          this.recipe.components || [],
          additionValidator(100)
        ),
      });
      this.setProperties();

      const props: PropertyDTO[] = [];
      this.recipe.properties?.forEach((p) => {
        const found = this.properties?.find(
          (prop: PropertyDTO) => prop.id === p
        );
        if (found) {
          props.push(found);
        }
      });
    }
  }

  get componentArrayControl(): FormArray {
    return this.formulationForm.get('components') as FormArray;
  }
  setProperties() {
    if (this.recipe?.properties && this.propertiesProfile !== undefined) {
      const props: PropertyDTO[] = [];
      this.recipe.properties.forEach((p) => {
        const propFound = this.propertiesProfile?.find((prop) => prop.id === p);
        if (propFound) {
          props.push(propFound);
        }
      });
      this.properties = props;
    }
  }

  onSelectComposition(composition: CompositionDTO): void {
    this.selectedComposition = composition;
    this.formulationForm.patchValue({ composition_id: composition.id });
  }
  onSubmit(): void {
    if (this.formulationForm.invalid) {
      return;
    }

    const formValue = Object.assign({}, this.formulationForm.value);

    console.info(formValue);
    this.recipe = {
      ...this.recipe,
      ...this.formulationForm.value,
      components: formValue.components.map((c: any) => ({
        component_id:
          c.component && c.component.id ? c.component.id : c.component_id,
        percentage: c.percentage,
      })),
      properties: formValue.components
        .map((c: any) =>
          c.component.properties.map((p: PropertyDTO) => p?.id || p)
        )
        .flat()
        .filter((v: any, i: number, arr: any[]) => arr.indexOf(v) === i),
    };

    if (this.recipeId) {
      // TODO update
      console.info(this.recipe);
      this.recipesService
        .updateRecipe(this.recipe)
        .subscribe((res) => this.router.navigate(['recipes']));
    } else {
      this.recipesService
        .createRecipe({ ...this.recipe, profile_id: this.profile_id })
        .subscribe((res) => this.router.navigate(['recipes']));
    }
  }
}
