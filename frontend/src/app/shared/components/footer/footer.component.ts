import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  isLogged: boolean;
  constructor(private router: Router, private store: Store<AppState>) {
    this.isLogged = false;

    this.store.select('auth').subscribe((auth) => {
      this.isLogged = false;
      if (auth.credentials.access_token) {
        this.isLogged = true;
      }
    });
  }

  ngOnInit(): void {}

  navigate(route: string) {
    this.router.navigateByUrl(route);
  }
}
