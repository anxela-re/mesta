import { TestBed } from '@angular/core/testing';

import { ProfileSelectedGuard } from './profile-selected.guard';

describe('ProfileSelectedGuard', () => {
  let guard: ProfileSelectedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProfileSelectedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
