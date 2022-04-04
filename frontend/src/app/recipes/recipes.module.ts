import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { FormulationComponent } from './components/formulation/formulation.component';

@NgModule({
  declarations: [RecipesComponent, RecipeDetailComponent, FormulationComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class RecipesModule {}
