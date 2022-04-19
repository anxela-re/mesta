import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { logout } from 'src/app/auth/actions';
import { TokenService } from 'src/app/auth/services/token.service';
import {
  faBars,
  faUser,
  faArrowRightFromBracket,
  faCogs,
} from '@fortawesome/free-solid-svg-icons';
import { ProfileDTO } from 'src/app/user/models/profile.dto';
import { ProfilesActions } from 'src/app/user/actions';
import { ProfileSelectedService } from 'src/app/user/services/profile-selected.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLogged: boolean;
  isMenuOpen: boolean = false;

  faBars = faBars;
  faUser = faUser;
  faCogs = faCogs;
  faArrowRightFromBracket = faArrowRightFromBracket;

  profiles: ProfileDTO[] = [];
  profileSelected?: number | undefined;
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private tokenService: TokenService,
    private profileSelectedService: ProfileSelectedService
  ) {
    this.isLogged = false;

    this.store.select('auth').subscribe((auth) => {
      this.isLogged = false;
      if (auth.credentials.access_token) {
        this.isLogged = true;
      }
      console.info('Authentication -->', this.isLogged);
    });

    this.store.select('profiles').subscribe((data) => {
      this.profiles = data.profiles;
      if (data.selected) {
        this.profileSelected = data.selected;
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: any) {
    if (event.target && event.target.closest('#button-menu') === null) {
      this.isMenuOpen = false;
    }
  }

  ngOnInit(): void {}

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

  selectProfile(profileId: number | undefined) {
    if (profileId) {
      this.store.dispatch(
        ProfilesActions.selectProfile({ profileId: profileId })
      );
      this.profileSelectedService.setProfileSelected(profileId);
    }
  }

  logout(): void {
    this.store.dispatch(logout());
    this.router.navigateByUrl('/');
  }
}
