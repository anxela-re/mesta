import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from 'src/app/app.reducers';
import { ProfileDTO } from 'src/app/profiles/models/profile.dto';
import { ProfileSelectedService } from 'src/app/profiles/services/profile-selected.service';
import { SharedService } from 'src/app/shared/services/shared.service';

import { RecipesService } from './recipes.service';

xdescribe('RecipesService', () => {
  let service: RecipesService;
  let storeMock: MockStore;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let profileSelectedService: ProfileSelectedService;
  let initialState: any;

  beforeEach(() => {
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
    };
    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'put',
      'delete',
    ]);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [provideMockStore({ initialState })],
    });
    storeMock = TestBed.inject(MockStore);
    let sharedService = new SharedService(storeMock as Store<AppState>);
    profileSelectedService = new ProfileSelectedService(
      storeMock as Store<AppState>
    );
    service = new RecipesService(
      httpClientSpy,
      sharedService,
      storeMock as Store<AppState>,
      profileSelectedService
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
