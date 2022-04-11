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

@Injectable({
  providedIn: 'root',
})
export class ProfileGuard implements CanActivate {
  hasProfiles: boolean = false;
  constructor(private store: Store<AppState>, private router: Router) {
    this.store.select('profiles').subscribe(({ profiles }) => {
      this.hasProfiles = profiles.length > 0;
    });
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

    this.router.navigate(['/profile', 'new']);

    return false;
  }
}
