import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompositionItemComponent } from './components/composition-item/composition-item.component';
import { CompositionFormComponent } from './components/composition-form/composition-form.component';
import { CompositionsListComponent } from './components/compositions-list/compositions-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CompositionItemComponent,
    CompositionFormComponent,
    CompositionsListComponent,
  ],
  imports: [CommonModule, FontAwesomeModule, FormsModule, ReactiveFormsModule],
  exports: [CompositionsListComponent, CompositionItemComponent],
})
export class CompositionsModule {}
