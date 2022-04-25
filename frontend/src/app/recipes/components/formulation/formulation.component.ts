import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { PropertyDTO } from 'src/app/properties/models/property.dto';
import { IBreadcrumbHistory } from 'src/app/shared/components/breadcrumb/breadcrumb.component';
import { PhaseDTO } from 'src/app/user/models/phase.dto';
import { RecipeDTO } from '../../models/recipe.dto';

@Component({
  selector: 'app-formulation',
  templateUrl: './formulation.component.html',
  styleUrls: ['./formulation.component.scss'],
})
export class FormulationComponent implements OnInit {
  recipeId!: number;
  recipe!: RecipeDTO;
  propertiesProfile: PropertyDTO[] = [];
  properties: PropertyDTO[] = [];
  profile_id: number | undefined;
  phases: PhaseDTO[] | undefined = [];

  formulationForm!: FormGroup;
  name!: FormControl;
  description!: FormControl;

  breadcrumbHistory: IBreadcrumbHistory[] = [];
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    const recipeId = this.route.snapshot.paramMap.get('id');
    if (recipeId) {
      this.recipeId = parseInt(recipeId);
    }

    this.store.select('profiles').subscribe(({ profiles, selected }) => {
      if (selected) {
        this.phases = profiles?.find((p) => p.id === selected)?.phases;
        this.profile_id = selected;
      }
    });
    this.store.select('properties').subscribe(({ properties, loaded }) => {
      if (loaded) {
        this.propertiesProfile = properties;
        this.setProperties();
      }
    });
  }

  ngOnInit(): void {
    if (this.recipeId) {
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
    this.name = new FormControl(this.recipe.name, [
      Validators.required,
      Validators.maxLength(64),
    ]);
    this.description = new FormControl(this.recipe.description);

    this.formulationForm = this.fb.group({
      name: this.name,
      description: this.description,
    });
    this.setProperties();

    const props: PropertyDTO[] = [];
    this.recipe.properties?.forEach((p) => {
      const found = this.properties?.find((prop: PropertyDTO) => prop.id === p);
      if (found) {
        props.push(found);
      }
    });
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
  onSubmit(): void {
    if (this.formulationForm.invalid) {
      return;
    }

    this.recipe = {
      ...this.recipe,
      ...this.formulationForm.value,
    };
    // TODO set properties from components properties

    console.info(this.recipe);
    if (this.recipeId) {
      // TODO update
    } else {
      // TODO create
    }
  }
}
