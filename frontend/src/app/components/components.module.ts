import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { ComponentsRoutingModule } from './components-routing.module';
import { ComponentsComponent } from './components/components/components.component';
import { ComponentDetailComponent } from './components/component-detail/component-detail.component';
import { ComponentFormComponent } from './components/component-form/component-form.component';
import { SharedModule } from '../shared/shared.module';
import { PropertiesModule } from '../properties/properties.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentItemComponent } from './components/component-item/component-item.component';
import { ComponentsPhaseComponent } from './components/components-phase/components-phase.component';

@NgModule({
  declarations: [
    ComponentsComponent,
    ComponentDetailComponent,
    ComponentFormComponent,
    ComponentItemComponent,
    ComponentsPhaseComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentsRoutingModule,
    SharedModule,
    PropertiesModule,
    FontAwesomeModule,
    FormsModule
  ],
})
export class ComponentsModule {}
