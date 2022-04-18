import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { ComponentsRoutingModule } from './components-routing.module';
import { ComponentsComponent } from './components/components/components.component';
import { ComponentDetailComponent } from './components/component-detail/component-detail.component';
import { ComponentFormComponent } from './components/component-form/component-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ComponentsComponent,
    ComponentDetailComponent,
    ComponentFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentsRoutingModule,
    SharedModule,
  ],
})
export class ComponentsModule {}
