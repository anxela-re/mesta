import { Component, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit {
  title: string = 'mesta-front';
  isLogged: boolean = false;
  profileSelectedId!: number | undefined;

  constructor(
    private store: Store<AppState>,
    private profileSelectedService: ProfileSelectedService,
    private sharedService: SharedService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.store.select('auth').subscribe((data) => {
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

        this.sharedService.updateTheme();
        this.isLogged = true;
      } else {
        document.documentElement.classList.remove('dark');
        this.isLogged = false;
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
