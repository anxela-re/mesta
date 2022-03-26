import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from './auth/services/auth-state.service';
import { AuthService } from './auth/services/auth.service';
import { TokenService } from './auth/services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';

  constructor(
    private auth: AuthStateService,
    public router: Router,
    private token: TokenService,
    private oauth: AuthService
  ) {}
}
