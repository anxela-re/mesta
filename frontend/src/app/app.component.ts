import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducers';
import * as UserActions from './user/actions';
import * as ProfilesActions from './profiles/actions';
import * as AuthActions from './auth/actions';
import { ProfileSelectedService } from './profiles/services/profile-selected.service';
import { SharedService } from './shared/services/shared.service';
import { TokenService } from './auth/services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'testa-revolta-front';
  isLogged: boolean = false;
  profileSelectedId!: number | undefined;

  constructor(
    private store: Store<AppState>,
    private profileSelectedService: ProfileSelectedService,
    private sharedService: SharedService,
    private tokenService: TokenService
  ) {
    this.sharedService.updateTheme();
    this.store.select('auth').subscribe((data) => {
      console.info(this.tokenService.isValidToken());
      if (
        data.credentials.user_id &&
        data.credentials.user_id !== '' &&
        data.credentials.access_token &&
        data.credentials.access_token !== ''
      ) {
        if (!this.tokenService.isValidToken()) {
          this.store.dispatch(AuthActions.logout());
          return;
        }
        this.store.dispatch(
          ProfilesActions.getProfilesByUser({
            userId: data.credentials.user_id,
          })
        );
        this.store.dispatch(UserActions.getUser());
        this.isLogged = true;
      }
    });

    this.store.select('profiles').subscribe((data) => {
      if (
        data.selected === undefined &&
        data.profiles.length > 0 &&
        data.profiles[0].id
      ) {
        const profileSelectedStored =
          this.profileSelectedService.getProfileSelectedStored();
        let found = undefined;
        if (profileSelectedStored) {
          found = data.profiles.find(({ id }) => id === profileSelectedStored);
        }
        if (!found) {
          this.profileSelectedService.setProfileSelected(data.profiles[0].id);
        }
        this.store.dispatch(
          ProfilesActions.selectProfile({
            profile: found ? found : data.profiles[0],
          })
        );
      }

      if (this.profileSelectedId !== data.selected && data.selected) {
        this.profileSelectedId = data.selected;
      }
    });
  }
}
