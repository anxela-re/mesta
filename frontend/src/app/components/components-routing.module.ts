import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentDetailComponent } from './components/component-detail/component-detail.component';
import { ComponentFormComponent } from './components/component-form/component-form.component';
import { ComponentsComponent } from './components/components/components.component';

const routes: Routes = [
  { path: '', component: ComponentsComponent },
  { path: 'details', component: ComponentDetailComponent },
  { path: 'new', component: ComponentFormComponent },
  { path: 'edit/:id', component: ComponentFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentsRoutingModule {}
