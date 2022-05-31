import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { AuthTokenDTO } from './auth/models/authToken.dto';
import * as authActions from './auth/actions';
import * as userActions from './user/actions';
import * as profilesActions from './profiles/actions';

import { SharedModule } from './shared/shared.module';
import { AuthDTO } from './auth/models/auth.dto';
import { ProfileDTO } from './profiles/models/profile.dto';

const mockData = {
  id: '1',
  access_token: 'access_token',
  email: 'aredondorod@uoc.edu',
  name: 'admin',
  profiles: [
    new ProfileDTO({
      id: 2,
      name: 'profile 1',
      description: 'description',
      phases: [],
      user_id: 1,
      properties: [],
      compositions: [],
    }),
  ],
};
describe('AppComponent', () => {
  let storeMock: MockStore<{
    auth: {
      credentials: AuthTokenDTO;
      loading: boolean;
      loaded: boolean;
      error: any;
    };
    profiles: {};
  }>;

  const initialState = {
    auth: {
      credentials: {
        user_id: '',
        access_token: '',
        token_expires_at: '',
      },
      loading: false,
      loaded: true,
      error: null,
    },
    profiles: {
      profiles: [],
      selected: undefined,
      loading: false,
      loaded: false,
      error: null,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CommonModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        SharedModule,
      ],
      declarations: [AppComponent],
      providers: [
        provideMockStore({
          initialState,
        }),
      ],
    }).compileComponents();

    storeMock = TestBed.get<Store>(Store);
    const dispatchSpy = spyOn(storeMock, 'dispatch').and.callThrough();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'mesta-front'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('mesta-front');
  });

  it('should get profiles, data user and log in when credentials', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const now = new Date();
    const date = new Date(now.setDate(now.getDate() + 7));
    const dateString = date.toISOString();

    storeMock.dispatch(
      authActions.login({
        credentials: new AuthDTO(
          mockData.id,
          mockData.access_token,
          mockData.email,
          mockData.name,
          dateString
        ),
      })
    );
    localStorage.setItem('user_id', mockData.id);
    localStorage.setItem('access_token', mockData.access_token);
    localStorage.setItem('token_expires_at', dateString);
    storeMock.setState({
      auth: {
        credentials: new AuthTokenDTO(
          mockData.id,
          mockData.access_token,
          dateString
        ),
        loading: false,
        loaded: true,
        error: null,
      },
      profiles: {
        ...initialState.profiles,
      },
    });

    fixture.detectChanges();

    expect(storeMock.dispatch).toHaveBeenCalledWith(
      profilesActions.getProfilesByUser({ userId: '1' })
    );

    expect(storeMock.dispatch).toHaveBeenCalledWith(userActions.getUser());

    expect(app.isLogged).toBeTrue();
  });

  it('should not login when invalid token', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const now = new Date();
    const date = new Date(now.setDate(now.getDate() - 7));
    const dateString = date.toISOString();

    storeMock.dispatch(
      authActions.login({
        credentials: new AuthDTO(
          mockData.id,
          mockData.access_token,
          mockData.email,
          mockData.name,
          dateString
        ),
      })
    );

    localStorage.setItem('user_id', mockData.id);
    localStorage.setItem('access_token', mockData.access_token);
    localStorage.setItem('token_expires_at', dateString);
    storeMock.setState({
      auth: {
        credentials: new AuthTokenDTO(
          mockData.id,
          mockData.access_token,
          dateString
        ),
        loading: false,
        loaded: true,
        error: null,
      },
      profiles: {
        ...initialState.profiles,
      },
    });

    fixture.detectChanges();
    expect(storeMock.dispatch).toHaveBeenCalledWith(authActions.logout());
    expect(app.isLogged).toBeFalse();
  });

  describe('profiles', () => {
    const now = new Date();
    const date = new Date(now.setDate(now.getDate() - 7));
    const dateString = date.toISOString();
    const authState = {
      credentials: new AuthTokenDTO(
        mockData.id,
        mockData.access_token,
        dateString
      ),
      loading: false,
      loaded: true,
      error: null,
    };
    beforeEach(() => {
      localStorage.setItem('user_id', mockData.id);
      localStorage.setItem('access_token', mockData.access_token);
      localStorage.setItem('token_expires_at', dateString);

      storeMock.setState({
        auth: authState,
        profiles: {
          ...initialState.profiles,
        },
      });
    });
    it('should select first profile', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;

      storeMock.setState({
        auth: authState,
        profiles: {
          profiles: mockData.profiles,
          loading: false,
          loaded: true,
          error: null,
        },
      });

      fixture.detectChanges();
      expect(storeMock.dispatch).toHaveBeenCalledWith(
        profilesActions.selectProfile({ profile: mockData.profiles[0] })
      );
    });
  });
});
