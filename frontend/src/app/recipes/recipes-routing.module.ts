import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormulationComponent } from './components/formulation/formulation.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { RecipesComponent } from './components/recipes/recipes.component';

const routes: Routes = [
  { path: '', component: RecipesComponent },
  { path: 'details/:id', component: RecipeDetailComponent },
  { path: 'formulation', component: FormulationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
