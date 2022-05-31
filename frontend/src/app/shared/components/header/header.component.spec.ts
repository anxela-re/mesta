import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AuthTokenDTO } from 'src/app/auth/models/authToken.dto';
import { ProfileDTO } from 'src/app/profiles/models/profile.dto';
import { ProfileSelectedService } from 'src/app/profiles/services/profile-selected.service';

import { HeaderComponent } from './header.component';

const initialState = {
  auth: {
    credentials: new AuthTokenDTO('', ''),
    loading: false,
    loaded: true,
    error: null,
  },
  profiles: {
    profiles: [new ProfileDTO({name: 'profile 1', id: 1, user_id: 1})],
    selected: 1,
    loading: false,
    loaded: true,
    error: null,
  },
};
describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let storeMock: MockStore;

  beforeEach(async () => {
    localStorage.setItem('profile_selected', '1');
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule],
      providers: [
        provideMockStore({
          initialState,
        }),
      ],
    }).compileComponents();
    storeMock = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
