import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { FormulationComponent } from './components/formulation/formulation.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';
import { CompositionsModule } from '../compositions/compositions.module';
import { ComponentsModule } from '../components/components.module';
import { RecipeItemComponent } from './components/recipe-item/recipe-item.component';

@NgModule({
  declarations: [RecipesComponent, RecipeDetailComponent, FormulationComponent, RecipeItemComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RecipesRoutingModule,
    FontAwesomeModule,
    SharedModule,
    CompositionsModule,
    ComponentsModule
  ],
})
export class RecipesModule {}
