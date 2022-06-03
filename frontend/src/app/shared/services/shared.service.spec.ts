import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from 'src/app/app.reducers';
import { CompositionDTO } from 'src/app/compositions/models/composition.dto';

import { SharedService } from './shared.service';

describe('SharedService', () => {
  let service: SharedService;
  let storeMock: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({})],
    });
    storeMock = TestBed.inject(MockStore);
    service = new SharedService(storeMock as Store<AppState>);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should format query', () => {
    const value = service.formatQuery({ profile_id: 1, user_id: 2 });
    expect(value).toBe('profile_id=1&user_id=2');
  });

  it('should get properties by id', () => {
    const props = [
      { name: 'prop 1', id: 1, profile_id: 1 },
      { name: 'prop-2', id: 2, profile_id: 1 },
    ];
    const values = service.getPropertiesById(props, [1]);
    expect(values).toEqual([props[0]]);
  });

  it('should get composition by id', () => {
    const compositions = [
      new CompositionDTO({
        name: 'prop 1',
        id: 1,
        profile_id: 1,
        phases_id: [1],
        phases_percentage: [],
      }),
      new CompositionDTO({
        name: 'prop 2',
        id: 2,
        profile_id: 1,
        phases_id: [1],
        phases_percentage: [],
      }),
    ];
    const value = service.getCompositionById(compositions, 1);
    expect(value).toEqual(compositions[0]);
  });

  it('should updateTheme to dark', () => {
    localStorage.setItem('theme', 'dark');

    service.updateTheme();
    const darkEl = document.querySelector('.dark');
    expect(darkEl).toBeDefined();
  });

  it('should changeTheme to dark', () => {
    service.changeTheme('dark');
    expect(localStorage.theme).toEqual('dark');
  });

  it('should changeTheme to dark', () => {
    service.changeTheme('dark');
    expect(localStorage.theme).toEqual('dark');
  });

  it('shoudl toggle theme', () => {
    localStorage.setItem('theme', 'dark');
    service.toggleTheme();
    expect(localStorage.theme).toEqual('light');
  });
});
