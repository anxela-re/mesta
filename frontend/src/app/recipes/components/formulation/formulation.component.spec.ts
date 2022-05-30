import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { CompositionsModule } from 'src/app/compositions/compositions.module';
import { PropertiesModule } from 'src/app/properties/properties.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecipesRoutingModule } from '../../recipes-routing.module';

import { FormulationComponent } from './formulation.component';

describe('FormulationComponent', () => {
  let component: FormulationComponent;
  let fixture: ComponentFixture<FormulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulationComponent ],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RecipesRoutingModule,
        SharedModule,
        CompositionsModule,
        ComponentsModule,
        PropertiesModule,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
