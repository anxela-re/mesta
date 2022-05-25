import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileSelectedService } from 'src/app/profiles/services/profile-selected.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileSelectedGuard implements CanActivate {
  constructor(private profileSelectedService: ProfileSelectedService) {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const stored = this.profileSelectedService.getProfileSelectedStored();

    if (stored !== undefined) {
      return true;
    }

    return false;
  }
}
