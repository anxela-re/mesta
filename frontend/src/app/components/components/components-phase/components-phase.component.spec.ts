import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { PhaseDTO } from 'src/app/phases/models/phase.dto';
import { PropertyDTO } from 'src/app/properties/models/property.dto';
import { ComponentDTO } from '../../models/component.dto';

import { ComponentsPhaseComponent } from './components-phase.component';

describe('ComponentsPhaseComponent', () => {
  let component: ComponentsPhaseComponent;
  let fixture: ComponentFixture<ComponentsPhaseComponent>;
  let storeMock: MockStore;

  beforeEach(async () => {
    localStorage.setItem('access_token', 'access_token');
    localStorage.setItem('user_id', '1');
    localStorage.setItem('selected_profile', '1');
    await TestBed.configureTestingModule({
      declarations: [ComponentsPhaseComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [provideMockStore({})],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsPhaseComponent);
    component = fixture.componentInstance;
    component.phase = new PhaseDTO({
      id: 1,
      profile_id: 1,
      name: 'phase',
      color: '#fff',
      description: 'phase',
    });
    component.components = [new ComponentDTO()];
    component.properties = [new PropertyDTO()];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init form when change', () => {
    component.initForm = jasmine.createSpy('initForm');
    const simpleChanges = new SimpleChange(5, 10, false);
    component.ngOnChanges({ percentage: simpleChanges });
    expect(component.initForm).toHaveBeenCalled();
  });

  it('should init form with recipe form', () => {
    component.fromFormulation = true;
    component.phase = { id: 1 };
    component.recipeComponentsArrayControl = new FormArray([
      new FormGroup({
        id: new FormControl(1),
        percentage: new FormControl(10),
      }),
    ]);
    component.initForm();
    expect(component.phaseComponentsForm).toBeDefined();
  });

  it('should get percentage by component id', () => {
    const found = { component: { id: 1 }, percentage: 10 };
    component.phaseComponentsForm = new FormArray([]);
    component.phaseComponentsForm.push(new FormControl(found));
    const returnValue = component.getPercentageByComponentId(1);
    expect(returnValue).toBe(10);
  });
});
