import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { ProfileDTO } from 'src/app/profiles/models/profile.dto';
import { PropertyDTO } from '../../models/property.dto';

import { PropertyItemComponent } from './property-item.component';

describe('PropertyItemComponent', () => {
  let component: PropertyItemComponent;
  let fixture: ComponentFixture<PropertyItemComponent>;
  let initialState: any;
  let actions$ = new Observable<Action>();

  beforeEach(async () => {
    localStorage.setItem('access_token', 'access_token');
    localStorage.setItem('user_id', '1');
    localStorage.setItem('selected_profile', '1');
    initialState = {
      profiles: {
        profiles: [
          new ProfileDTO({
            id: 1,
            name: 'profile 1',
            description: 'description',
            phases: [],
            user_id: 1,
            properties: [],
            compositions: [],
          }),
        ],
        selected: 1,
        loading: false,
        loaded: true,
        error: null,
      },
      properties: {
        properties: [
          new PropertyDTO({
            id: 1,
            name: 'property 1',
            profile_id: 1,
          }),
        ],
        loading: false,
        loaded: true,
        error: null,
      },
    };

    await TestBed.configureTestingModule({
      declarations: [PropertyItemComponent],
      providers: [
        provideMockStore({ initialState }),
        provideMockActions(() => actions$),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select', () => {
    component.property = { name: 'property', id: 1, profile_id: 1 };
    component.editing = false;
    component.allowEdition = true;
    component.onSelect.emit = jasmine.createSpy('emit');

    component.select();

    expect(component.onSelect.emit).toHaveBeenCalled();
  });

  it('should change property', () => {
    component.onPropertyChange({ target: { textContent: 'new' } });
    expect(component.edited).toBeTruthy();
    expect(component.propertyEdited).toBe('new');
  });
});
