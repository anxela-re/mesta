import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducers';
import { PhasesActions, ProfilesActions, UserActions } from './user/actions';
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
    this.store.select('auth').subscribe((data) => {
      if (
        data.credentials.user_id &&
        data.credentials.access_token &&
        data.loaded
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

    const profileSelectedStored =
      this.profileSelectedService.getProfileSelected();
    if (profileSelectedStored) {
      this.store.dispatch(
        ProfilesActions.selectProfile({
          profileId: profileSelectedStored,
        })
      );
    }

    this.store.select('profiles').subscribe((data) => {
      if (
        data.selected === undefined &&
        data.profiles.length > 0 &&
        data.profiles[0].id &&
        data.loaded
      ) {
        this.store.dispatch(
          ProfilesActions.selectProfile({ profileId: data.profiles[0].id })
        );
        this.profileSelectedService.setProfileSelected(data.profiles[0].id);
      }

      if (data.profiles.length > 0 && !data.loading) {
        data.profiles.map((profile) => {
          if (profile.id && profile.phases === undefined) {
            console.info(profile.id);
            this.store.dispatch(
              PhasesActions.getPhasesByProfile({ profileId: profile.id })
            );
          }
        });
      }
    });
  }
}
