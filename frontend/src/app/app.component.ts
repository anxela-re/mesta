import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducers';
import * as UserActions from './user/actions';
import * as ProfilesActions from './profiles/actions';
import * as PhasesActions from './phases/actions';
import { ProfileSelectedService } from './profiles/services/profile-selected.service';
import { SharedService } from './shared/services/shared.service';

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
    private router: Router,
    private sharedService: SharedService
  ) {
    this.store.select('auth').subscribe((data) => {
      console.info(data);
      if (
        data.credentials.user_id &&
        data.credentials.user_id !== '' &&
        data.credentials.access_token &&
        data.credentials.access_token !== ''
      ) {
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

  openPopup(): void {
    this.sharedService.manageModal('aa', 'bb', true, () => console.info('arrive to app component'));
  }
}
