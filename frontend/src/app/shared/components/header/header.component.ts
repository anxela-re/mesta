import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { logout } from 'src/app/auth/actions';
import { TokenService } from 'src/app/auth/services/token.service';
import { faBars } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLogged: boolean;
  faBars = faBars;
  constructor(
    private router: Router,
    private store: Store<AppState>,
    private tokenService: TokenService
  ) {
    this.isLogged = false;
  }

  ngOnInit(): void {
    this.store.select('auth').subscribe((auth) => {
      this.isLogged = false;
      if (auth.credentials.access_token) {
        this.isLogged = true;
      }
    });
  }

  login(): void {
    this.router.navigateByUrl('login');
  }

  register(): void {
    this.router.navigateByUrl('register');
  }

  forgotPassword(): void {
    this.router.navigateByUrl('forgot-password');
  }

  resetPassword(): void {
    this.router.navigateByUrl('reset-password');
  }

  logout(): void {
    this.tokenService.removeToken();
    this.store.dispatch(logout());
    this.router.navigateByUrl('/');
  }

  userConfig(): void {
    this.router.navigateByUrl('configuration');
  }
}
