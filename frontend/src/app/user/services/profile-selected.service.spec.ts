import { TestBed } from '@angular/core/testing';

import { ProfileSelectedService } from './profile-selected.service';

describe('ProfileSelectedService', () => {
  let service: ProfileSelectedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileSelectedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
