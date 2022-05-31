import { TestBed } from '@angular/core/testing';

import { ProfileSelectedGuard } from './profile-selected.guard';

xdescribe('ProfileSelectedGuard', () => {
  let guard: ProfileSelectedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProfileSelectedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('Profile not selected', () => {
    beforeEach(() => {
      localStorage.setItem('profile_selected', '1');
    });

    it('should return false', () => {
      const value = guard.canActivate();
      expect(value).toBeFalse();
    });
  });

  describe('Profile not selected', () => {
    beforeEach(() => {
      localStorage.removeItem('profile_selected');
    });

    it('should return true', () => {
      const value = guard.canActivate();
      expect(value).toBeTrue();
    });
  });
});
