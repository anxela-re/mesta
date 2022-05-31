import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { AppState } from 'src/app/app.reducers';
import { AuthTokenDTO } from 'src/app/auth/models/authToken.dto';
import { SharedService } from 'src/app/shared/services/shared.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterDTO } from '../models/register.dto';
import { UserDTO } from '../models/user.dto';

import { UserService } from './user.service';

const mockData = {
  id: '1',
  access_token: 'access_token',
  email: 'aredondorod@uoc.edu',
  name: 'admin',
};
describe('UserService', () => {
  let service: UserService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let storeMock: MockStore;
  const now = new Date();
  const date = new Date(now.setDate(now.getDate() - 7));
  const dateString = date.toISOString();
  let initialState: any;

  beforeEach(() => {
    localStorage.setItem('access_token', mockData.access_token);
    localStorage.setItem('user_id', mockData.id);
    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'put',
      'delete',
    ]);
    initialState = {
      auth: {
        credentials: new AuthTokenDTO('', ''),
        loading: false,
        loaded: true,
        error: null,
      },
    };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule],
      providers: [
        provideMockStore({
          initialState,
        }),
      ],
    });
    storeMock = TestBed.inject(MockStore);
    let sharedService = new SharedService(storeMock as Store<AppState>);
    service = new UserService(
      httpClientSpy,
      sharedService,
      storeMock as Store<AppState>
    );
    localStorage.setItem('access_token', mockData.access_token);
    localStorage.setItem('user_id', mockData.id);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update accessToken', () => {
    storeMock.setState({
      auth: initialState.auth,
    });

    expect(service.accessToken).toBe('access_token');
  });

  describe('Requests', () => {
    beforeEach(() => {
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
      storeMock.setState({
        auth: authState,
      });
      localStorage.setItem('access_token', mockData.access_token);
      localStorage.setItem('user_id', mockData.id);
    });
    it('should request register', () => {
      const user: RegisterDTO = {
        name: mockData.name,
        email: mockData.email,
        password: 'admin',
        password_confirmation: 'admin',
      };
      httpClientSpy.post.and.returnValue(of(user));

      service.register(user).subscribe((data) => {
        expect(data).toEqual(user);
      });

      expect(httpClientSpy.post.calls.count()).withContext('one call').toBe(1);
    });
    it('should request getUser', () => {
      const user: UserDTO = {
        name: mockData.name,
        email: mockData.email,
      };
      httpClientSpy.get.and.returnValue(of(user));

      service.getUser().subscribe((data) => {
        expect(data).toEqual(user);
      });

      expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1);
    });
    it('should request updateUser', () => {
      const user: UserDTO = {
        name: mockData.name,
        email: mockData.email,
      };
      httpClientSpy.put.and.returnValue(of(user));

      service.updateUser(user).subscribe((data) => {
        expect(data).toEqual(user);
      });

      expect(httpClientSpy.put.calls.count()).withContext('one call').toBe(1);
    });
    it('should request deleteUser', () => {
      const user: UserDTO = {
        name: mockData.name,
        email: mockData.email,
        id: 1,
      };
      httpClientSpy.delete.and.returnValue(of(user));

      service.deleteUser(1).subscribe((data) => {
        expect(data).toEqual(user);
      });

      expect(httpClientSpy.delete.calls.count())
        .withContext('one call')
        .toBe(1);
    });
  });
});
