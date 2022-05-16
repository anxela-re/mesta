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
import { ProfileDTO } from 'src/app/profiles/models/profile.dto';
import * as ProfilesActions from 'src/app/profiles/actions';
import { ProfileSelectedService } from 'src/app/profiles/services/profile-selected.service';
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

  currnetLogoPath: string =
    localStorage.theme === 'dark'
      ? '../../../../assets/images/logo-white.png'
      : '../../../../assets/images/logo.png';
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private profileSelectedService: ProfileSelectedService
  ) {
    this.isLogged = false;

    this.store.select('auth').subscribe((auth) => {
      console.info('header');
      this.isLogged = false;
      console.info(auth);
      if (auth.credentials.access_token) {
        this.isLogged = true;
      }
      console.info('Authentication -->', this.isLogged);
    });

    this.store.select('profiles').subscribe((data) => {
      console.info('header');
      this.profiles = data.profiles;
      if (data.selected) {
        this.profileSelected = data.selected;
      }
    });
  }

  ngOnInit(): void {
      
  }
  @HostListener('document:click', ['$event'])
  onClickOutside(event: any) {
    if (event.target && event.target.closest('#button-menu') === null) {
      this.isMenuOpen = false;
    }
  }

  @HostListener('window:changeTheme', [])
  onChangeTheme() {
    console.info(localStorage.theme);
    this.updateLogoPath();
  }

  updateLogoPath(): void {
    this.currnetLogoPath = localStorage.theme === 'dark'
      ? '../../../../assets/images/logo-white.png'
      : '../../../../assets/images/logo.png';
  }
  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

  selectProfile(profile: ProfileDTO | undefined) {
    if (profile && profile.id) {
      this.store.dispatch(ProfilesActions.selectProfile({ profile: profile }));
      this.profileSelectedService.setProfileSelected(profile.id);
    }
  }

  logout(): void {
    this.store.dispatch(logout());
  }
}
