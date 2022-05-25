import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsRoutingModule } from './components-routing.module';
import { ComponentsComponent } from './components/components/components.component';
import { ComponentFormComponent } from './components/component-form/component-form.component';
import { SharedModule } from '../shared/shared.module';
import { PropertiesModule } from '../properties/properties.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentItemComponent } from './components/component-item/component-item.component';
import { ComponentsPhaseComponent } from './components/components-phase/components-phase.component';
import { ComponentDetailsComponent } from './components/component-details/component-details.component';
import { CurrentPercentageAssignPipe } from './services/current-percentage-assign.pipe';

@NgModule({
  declarations: [
    ComponentsComponent,
    ComponentDetailsComponent,
    ComponentFormComponent,
    ComponentItemComponent,
    ComponentsPhaseComponent,
    ComponentDetailsComponent,
    CurrentPercentageAssignPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentsRoutingModule,
    SharedModule,
    PropertiesModule,
    FontAwesomeModule,
    FormsModule,
  ],
  exports: [ComponentsComponent],
})
export class ComponentsModule {}
