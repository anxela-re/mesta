import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AuthTokenDTO } from 'src/app/auth/models/authToken.dto';
import * as authActions from '../../auth/actions';

import { IsNotLoggedGuard } from './is-not-logged.guard';

const initialState = {
  auth: {
    credentials: new AuthTokenDTO('', ''),
    loading: false,
    loaded: true,
    error: null,
  },
};
xdescribe('IsNotLoggedGuard', () => {
  let guard: IsNotLoggedGuard;
  let storeMock: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [provideMockStore({ initialState })],
    });
    storeMock = TestBed.inject(MockStore);
    guard = TestBed.inject(IsNotLoggedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('Not logged', () => {
    beforeEach(() => {
      localStorage.removeItem('access_token')
      localStorage.removeItem('user_id')
      storeMock.setState({
        auth: {...initialState.auth, credentials: new AuthTokenDTO('','')},
      });
      storeMock.dispatch(authActions.logout());
    });
    it('should return true', () => {
      const value = guard.canActivate();
      expect(value).toBeTrue();
    });
  });

  describe('Not logged', () => {
    beforeEach(() => {
      localStorage.setItem('access_token', 'access_token');
      localStorage.setItem('user_id', '1');
      storeMock.setState({
        auth: {...initialState.auth, credentials: new AuthTokenDTO('1','access_token')},
      });
    });
    it('should return false', () => {
      const value = guard.canActivate();
      expect(value).toBeFalse();
    });
  });
});
