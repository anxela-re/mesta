import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PropertiesModule } from 'src/app/properties/properties.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsRoutingModule } from '../../components-routing.module';

import { ComponentDetailsComponent } from './component-details.component';

describe('ComponentDetailsComponent', () => {
  let component: ComponentDetailsComponent;
  let fixture: ComponentFixture<ComponentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComponentDetailsComponent],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        ComponentsRoutingModule,
        SharedModule,
        PropertiesModule,
        FormsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
