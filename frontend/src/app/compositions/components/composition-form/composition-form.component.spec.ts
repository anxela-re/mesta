import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { PhaseDTO } from 'src/app/phases/models/phase.dto';
import { ProfileDTO } from 'src/app/profiles/models/profile.dto';

import { CompositionFormComponent } from './composition-form.component';

describe('CompositionFormComponent', () => {
  let component: CompositionFormComponent;
  let fixture: ComponentFixture<CompositionFormComponent>;
  let initialState: any;
  let storeMock: MockStore;
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
      phases: {
        phases: [
          new PhaseDTO({
            id: 1,
            name: 'phase 1',
            profile_id: 1,
          }),
        ],
        loading: false,
        loaded: true,
        error: null,
      },
    };

    await TestBed.configureTestingModule({
      declarations: [ CompositionFormComponent ],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        provideMockStore({ initialState }),
        provideMockActions(() => actions$),
      ],
    })
    .compileComponents();
    storeMock = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompositionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
