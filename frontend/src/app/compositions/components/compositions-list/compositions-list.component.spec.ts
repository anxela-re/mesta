import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { ProfileDTO } from 'src/app/profiles/models/profile.dto';
import { CompositionDTO } from '../../models/composition.dto';

import { CompositionsListComponent } from './compositions-list.component';

describe('CompositionsListComponent', () => {
  let component: CompositionsListComponent;
  let fixture: ComponentFixture<CompositionsListComponent>;
  let initialState: any;
  let storeMock: MockStore;

  beforeEach(async () => {
    localStorage.setItem('access_token', 'access_token');
    localStorage.setItem('user_id', '1');
    localStorage.setItem('selected_profile', '1');
    initialState = {
      compositions: {
        compositions: [new CompositionDTO()],
        loading: false,
        loaded: true,
        error: null,
      },
    };

    await TestBed.configureTestingModule({
      declarations: [CompositionsListComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
    storeMock = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompositionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
