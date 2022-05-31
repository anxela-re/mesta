import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { PropertyDTO } from 'src/app/properties/models/property.dto';

import { PropertiesDisplayComponent } from './properties-display.component';

describe('PropertiesDisplayComponent', () => {
  let component: PropertiesDisplayComponent;
  let fixture: ComponentFixture<PropertiesDisplayComponent>;
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
        loading: false,
        loaded: true,
        error: null,
      },
    };

    await TestBed.configureTestingModule({
      declarations: [PropertiesDisplayComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    storeMock = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
