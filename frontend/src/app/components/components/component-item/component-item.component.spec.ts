import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PropertiesModule } from 'src/app/properties/properties.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsRoutingModule } from '../../components-routing.module';

import { ComponentItemComponent } from './component-item.component';

describe('ComponentItemComponent', () => {
  let component: ComponentItemComponent;
  let fixture: ComponentFixture<ComponentItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentItemComponent ],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        ComponentsRoutingModule,
        SharedModule,
        PropertiesModule,
        FontAwesomeModule,
        FormsModule,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
