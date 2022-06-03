import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { AuthTokenDTO } from 'src/app/auth/models/authToken.dto';
import { CompositionDTO } from 'src/app/compositions/models/composition.dto';
import { PhaseDTO } from 'src/app/phases/models/phase.dto';
import { ProfileDTO } from 'src/app/profiles/models/profile.dto';
import { PropertyDTO } from 'src/app/properties/models/property.dto';

import { RecipesComponent } from './recipes.component';

describe('RecipesComponent', () => {
  let component: RecipesComponent;
  let fixture: ComponentFixture<RecipesComponent>;
  let initialState: any;
  let actions$ = new Observable<Action>();

  beforeEach(async () => {
    localStorage.setItem('access_token', 'access_token');
    localStorage.setItem('user_id', '1');
    localStorage.setItem('selected_profile', '1');
    initialState = {
      auth: {
        credentials: new AuthTokenDTO('1', 'access_token'),
        loading: false,
        loaded: true,
        error: null,
      },
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
      phases: {
        phases: [
          new PhaseDTO({
            id: 1,
            name: 'phase 1',
            description: 'description',
            profile_id: 1,
          }),
        ],
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
      compositions: {
        compositions: [
          new CompositionDTO({
            id: 1,
            name: 'property 1',
            profile_id: 1,
            phases_id: [],
            phases_percentage: [],
          }),
        ],
        loading: false,
        loaded: true,
        error: null,
      },
    };
    await TestBed.configureTestingModule({
      declarations: [RecipesComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        provideMockStore({ initialState }),
        provideMockActions(() => actions$),
      ],
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
