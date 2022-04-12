import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.reducers';
import { ProfileSelectedService } from 'src/app/user/services/profile-selected.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileGuard implements CanActivate {
  hasProfiles: boolean = false;
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private profileSelected: ProfileSelectedService
  ) {
    const profileSelectedStored = this.profileSelected.getProfileSelected();
    if(profileSelectedStored) {
      this.hasProfiles = true;
    }
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.hasProfiles) {
      return true;
    }

    // if (this.hasProfiles !== undefined) {
    this.router.navigate(['/profile', 'new']);
    // }

    return false;
  }
}
