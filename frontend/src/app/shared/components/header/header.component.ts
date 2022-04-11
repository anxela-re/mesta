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
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private tokenService: TokenService
  ) {
    this.isLogged = false;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: any) {
    if (event.target && event.target.closest('#button-menu') === null) {
      this.isMenuOpen = false;
    }
  }

  ngOnInit(): void {
    this.store.select('auth').subscribe((auth) => {
      this.isLogged = false;
      if (auth.credentials.access_token) {
        this.isLogged = true;
      }
    });
  }

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

  logout(): void {
    this.tokenService.removeToken();
    this.store.dispatch(logout());
    this.router.navigateByUrl('/');
  }
}
