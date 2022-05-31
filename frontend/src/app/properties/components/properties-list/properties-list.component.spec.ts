import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { PropertyDTO } from '../../models/property.dto';

import { PropertiesListComponent } from './properties-list.component';

describe('PropertiesListComponent', () => {
  let component: PropertiesListComponent;
  let fixture: ComponentFixture<PropertiesListComponent>;
  let storeMock: MockStore;
  let initialState: any;

  beforeEach(async () => {
    localStorage.setItem('access_token', 'access_token');
    localStorage.setItem('user_id', '1');
    localStorage.setItem('selected_profile', '1');
    initialState = {
      properties: {
        properties: [
          new PropertyDTO({
            id: 1,
            name: 'property 1',
            profile_id: 1,
          }),
        ],
        filtered: [],
        loading: false,
        loaded: true,
        error: null,
      },
    };

    await TestBed.configureTestingModule({
      declarations: [PropertiesListComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    storeMock = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
