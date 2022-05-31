import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { AppState } from 'src/app/app.reducers';

import { ContactService } from './contact.service';
import { SharedService } from './shared.service';

describe('ContactService', () => {
  let service: ContactService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let storeMock: MockStore;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [provideMockStore({})],
    });

    storeMock = TestBed.inject(MockStore);
    let sharedService = new SharedService(storeMock as Store<AppState>);
    service = new ContactService(httpClientSpy, sharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should post contact form', () => {
    const data = 'message';
    httpClientSpy.post.and.returnValue(of(data));

    service
      .contact({
        body: 'Lorem ipsum',
        email: 'admin@gmail.com',
        name: 'name',
      })
      .subscribe((response) => {
        expect(response).toEqual(data);
      });

    expect(httpClientSpy.post.calls.count()).withContext('one call').toBe(1);
  });
});
