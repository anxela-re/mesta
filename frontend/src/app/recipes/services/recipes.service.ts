import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducers';
import { PropertyDTO } from 'src/app/properties/models/property.dto';
import { IQuery, SharedService } from 'src/app/shared/services/shared.service';
import { RecipeDTO } from '../models/recipe.dto';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  apiUrl = 'http://127.0.0.1:8000/api/recipes';
  accessToken!: string;
  profileSelected!: number;
  constructor(
    private http: HttpClient,
    private sharedService: SharedService,
    private store: Store<AppState>
  ) {
    this.store.select('auth').subscribe((auth) => {
      this.accessToken = auth.credentials.access_token;
    });

    this.store.select('profiles').subscribe((profiles) => {
      if (profiles.selected) {
        this.profileSelected = profiles.selected;
      }
    });
  }

  getRecipesByProfile(query?: IQuery): Observable<any> {
    return this.getRecipes({ profile_id: this.profileSelected, ...query });
  }
  getRecipes(query?: IQuery): Observable<any> {
    return this.http
      .get(`${this.apiUrl}?${this.sharedService.formatQuery(query)}`)
      .pipe(
        catchError(this.sharedService.handleError),
        map((res: any) => res.items)
      );
  }

  createRecipe(recipe: RecipeDTO): Observable<any> {
    return this.http
      .post(`${this.apiUrl}`, recipe)
      .pipe(catchError(this.sharedService.handleError));
  }

  updateRecipe(recipe: RecipeDTO): Observable<any> {
    return this.http
      .put(`${this.apiUrl}`, recipe)
      .pipe(catchError(this.sharedService.handleError));
  }

  deleteRecipe(recipeId: number): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/${recipeId}`)
      .pipe(catchError(this.sharedService.handleError));
  }
}