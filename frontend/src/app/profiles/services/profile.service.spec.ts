import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from 'src/app/app.reducers';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ProfileDTO } from '../models/profile.dto';

import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let service: ProfileService;
  let storeMock: MockStore;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let initialState: any;

  beforeEach(() => {
    localStorage.setItem('access_token', 'access_token');
    localStorage.setItem('user_id', '1');
    localStorage.setItem('selected_profile', '1');
    initialState = {
      auth: {
        credentials: {
          access_token: 'access_token',
          user_id: 1,
        },
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
    };
    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'put',
      'delete',
    ]);

    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
    });
    storeMock = TestBed.inject(MockStore);
    let sharedService = new SharedService(storeMock as Store<AppState>);
    service = new ProfileService(
      httpClientSpy,
      sharedService,
      storeMock as Store<AppState>,
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
