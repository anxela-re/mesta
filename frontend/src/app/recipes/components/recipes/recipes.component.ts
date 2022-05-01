import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { AppState } from 'src/app/app.reducers';
import { PropertyDTO } from 'src/app/properties/models/property.dto';
import { SharedService } from 'src/app/shared/services/shared.service';
import { RecipeDTO } from '../../models/recipe.dto';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
  private searchSubject: Subject<string> = new Subject();

  recipes: RecipeDTO[] = [];
  searchTerm: string = '';

  faPlus = faPlus;

  propertiesProfile: PropertyDTO[] = [];

  constructor(
    private router: Router,
    private recipesService: RecipesService,
    private store: Store<AppState>,
    private sharedService: SharedService
  ) {
    this.recipesService
      .getRecipesByProfile()
      .subscribe((res) => (this.recipes = res));

    this.store.select('properties').subscribe((properties) => {
      if (properties.loaded) {
        this.propertiesProfile = properties.properties;
      }
    });
  }

  ngOnInit(): void {}

  search() {
    this.searchSubject.next(this.searchTerm);
  }

  onCreate(): void {
    this.router.navigate(['recipes', 'formulation']);
  }

  getPropertiesByRecipe(propertiesId: number[]): PropertyDTO[] {
    return this.sharedService.getPropertiesById(propertiesId);
  }
}
