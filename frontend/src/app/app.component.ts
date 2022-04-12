import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducers';
import { ProfilesActions, UserActions } from './user/actions';
import { ProfileSelectedService } from './user/services/profile-selected.service';
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
    private profileSelectedService: ProfileSelectedService
  ) {
    this.store.select('auth').subscribe(({ credentials }) => {
      if (credentials.user_id && credentials.access_token) {
        this.store.dispatch(
          ProfilesActions.getProfilesByUser({ userId: credentials.user_id })
        );
        this.store.dispatch(UserActions.getUser());
        this.isLogged = true;
      }
    });

    const profileSelectedStored =
      this.profileSelectedService.getProfileSelected();
    if (profileSelectedStored) {
      this.store.dispatch(
        ProfilesActions.selectProfile({
          profileId: profileSelectedStored,
        })
      );
    }
  }
}
