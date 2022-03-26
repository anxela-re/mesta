import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from './auth/services/auth-state.service';
import { AuthService } from './auth/services/auth.service';
import { TokenService } from './auth/services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isLogged!: boolean;
  title = 'testa-revolta-front';

  constructor(
    private auth: AuthStateService,
    public router: Router,
    private token: TokenService,
    private oauth: AuthService
  ) {}

  ngOnInit() {
    this.auth.userAuthState.subscribe((val) => {
      this.isLogged = val;
    });
  }

  logOut() {
    this.oauth.logout().subscribe(
      (res: any) => console.info(res),
      (error) => console.info(error)
    );
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.router.navigate(['/']);
  }

}
