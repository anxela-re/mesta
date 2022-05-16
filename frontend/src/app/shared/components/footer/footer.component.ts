import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  isLogged: boolean;
  faCopyright = faCopyright;
  constructor(private router: Router, private store: Store<AppState>) {
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
  }

  ngOnInit(): void {}

  navigate(route: string) {
    this.router.navigateByUrl(route);
  }
}
