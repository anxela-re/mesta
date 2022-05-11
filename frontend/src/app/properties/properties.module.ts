import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PropertyFormComponent } from './components/property-form/property-form.component';
import { PropertiesListComponent } from './components/properties-list/properties-list.component';
import { PropertyItemComponent } from './components/property-item/property-item.component';
import { PropertiesDisplayComponent } from './components/properties-display/properties-display.component';

@NgModule({
  declarations: [
    PropertyFormComponent,
    PropertiesListComponent,
    PropertyItemComponent,
    PropertiesDisplayComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    FontAwesomeModule,
    FormsModule,
  ],
  exports: [
    PropertyFormComponent,
    PropertiesListComponent,
    PropertiesDisplayComponent,
  ],
})
export class PropertiesModule {}
