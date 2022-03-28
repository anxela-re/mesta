import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLogged: boolean = false;

  constructor(private store: Store<AppState>) {
    this.store.select('auth').subscribe(({ credentials }) => {
      if (credentials.user_id && credentials.access_token) {
        this.isLogged = true;
      }
    });
  }
}
