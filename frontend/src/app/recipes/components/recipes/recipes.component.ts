import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { merge, Observable, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { AppState } from 'src/app/app.reducers';
import { PropertyDTO } from 'src/app/properties/models/property.dto';
import { SharedService } from 'src/app/shared/services/shared.service';
import { RecipeDTO } from '../../models/recipe.dto';
import { RecipesService } from '../../services/recipes.service';
import * as ProfilesActions from '../../../profiles/actions';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
})
export class RecipesComponent implements OnInit, OnDestroy {
  private searchSubject: Subject<string> = new Subject();

  recipes$: Observable<RecipeDTO[]> | undefined;
  recipes: RecipeDTO[] = [];
  searchTerm: string = '';
  propertiesIdSelected: string = '';

  faPlus = faPlus;

  propertiesProfile!: PropertyDTO[];

  private reloadList: Subject<any> = new Subject();
  private unsubscribe$ = new Subject<void>();
  constructor(
    private router: Router,
    private recipesService: RecipesService,
    private store: Store<AppState>,
    private sharedService: SharedService,
    private actions$: Actions
  ) {
    this.actions$
      .pipe(ofType(ProfilesActions.selectProfile), takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.reloadList.next();
      });

    this.store
      .select('properties')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(({ properties, loaded, filtered }) => {
        if (loaded && this.propertiesProfile !== properties) {
          this.propertiesProfile = properties;
        }
        if (filtered) {
          this.propertiesIdSelected = filtered.map((p) => p.id).join(',');
          this.reloadList.next();
        }
      });
  }

  ngOnInit(): void {
    this.recipes$ = merge(
      this.reloadList.pipe(
        switchMap(() =>
          this.recipesService.getRecipesByProfile({
            name: this.searchTerm,
            properties: this.propertiesIdSelected,
          })
        )
      ),
      this.searchSubject.pipe(
        startWith(this.searchTerm),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(() =>
          this.recipesService.getRecipesByProfile({
            name: this.searchTerm,
            properties: this.propertiesIdSelected,
          })
        )
      )
    );
    this.recipes$.subscribe((data) => (this.recipes = data));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  search() {
    this.searchSubject.next(this.searchTerm);
  }

  onCreate(): void {
    this.router.navigate(['recipes', 'formulation']);
  }

  getPropertiesByRecipe(propertiesId: number[]): PropertyDTO[] | null {
    if (this.propertiesProfile) {
      return this.sharedService.getPropertiesById(
        this.propertiesProfile,
        propertiesId
      );
    } else {
      return null;
    }
  }
}
