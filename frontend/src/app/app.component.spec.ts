import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MemoizedSelector, Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { AuthTokenDTO } from './auth/models/authToken.dto';
import * as authReducer from './auth/reducers';
import * as authActions from './auth/actions';
import * as userActions from './user/actions';
import * as profilesActions from './profiles/actions';

import {
  ProfilesState,
  initialState as initialProfileStateReducer,
} from './profiles/reducers';
import { SharedModule } from './shared/shared.module';
import { AuthDTO } from './auth/models/auth.dto';
import { TokenService } from './auth/services/token.service';

fdescribe('AppComponent', () => {
  // let componente: AppComponent;
  // let fixture: ComponentFixture<AppComponent>;
  let storeMock: MockStore<{
    auth: {
      credentials: {
        user_id: string;
        access_token: string;
        token_expires_at: string;
      };
      loading: boolean;
      loaded: boolean;
      error: any;
    };
    profiles: {};
  }>;

  const initialState = {
    auth: {
      credentials: {
        credentials: {
          user_id: '',
          access_token: '',
          token_expires_at: '',
        },
        loading: false,
        loaded: true,
        error: null,
      },
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
          '1',
          'access_token',
          'aredondorod@uoc.edu',
          'admin',
          dateString
        ),
      })
    );
    localStorage.setItem('user_id', '1');
    localStorage.setItem('access_token', 'access_token');
    localStorage.setItem('token_expires_at', dateString);
    storeMock.setState({
      auth: {
        credentials: new AuthTokenDTO('1', 'access_token', dateString),
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
          '1',
          'access_token',
          'aredondorod@uoc.edu',
          'admin',
          dateString
        ),
      })
    );
    
    localStorage.setItem('user_id', '1');
    localStorage.setItem('access_token', 'access_token');
    localStorage.setItem('token_expires_at', dateString);
    storeMock.setState({
      auth: {
        credentials: new AuthTokenDTO('1', 'access_token', dateString),
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
});
