import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducers';
import { ProfilesActions, UserActions } from './user/actions';
import { UserService } from './user/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLogged: boolean = false;

  constructor(
    private store: Store<AppState>,
    private userService: UserService
  ) {
    this.store.select('auth').subscribe(({ credentials }) => {
      if (credentials.user_id && credentials.access_token) {
        this.store.dispatch(UserActions.getUser());
        this.isLogged = true;
      }
    });

    this.store.select('user').subscribe(({ user }) => {
      console.info(user.id);
      if (user.id) {
        this.store.dispatch(
          ProfilesActions.getProfilesByUser({ userId: user.id })
        );
      }
    });
  }
}
