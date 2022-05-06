import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducers';
import * as UserActions from './user/actions';
import * as ProfilesActions from './profiles/actions';
import * as PhasesActions from './phases/actions';
import * as CompositionsActions from './compositions/actions';
import * as PropertiesActions from './properties/actions';
import { ProfileSelectedService } from './profiles/services/profile-selected.service';
import { UserService } from './user/services/user.service';
import { ProfileDTO } from './profiles/models/profile.dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLogged: boolean = false;
  profileSelectedId!: number | undefined;

  constructor(
    private store: Store<AppState>,
    private profileSelectedService: ProfileSelectedService,
    private router: Router
  ) {
    this.store.select('auth').subscribe((data) => {
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
    // const profileSelectedStored =
    //   this.profileSelectedService.getProfileSelectedStored();
    // if (profileSelectedStored && data.loaded && data.profiles && !data.selected) {
    //   const found = data.profiles.find(
    //     ({ id }) => id === profileSelectedStored
    //   );
    //   if (found) {
    //     this.store.dispatch(
    //       ProfilesActions.selectProfile({
    //         profile: found,
    //       })
    //     );
    //   }
    // }

    this.store.select('profiles').subscribe((data) => {
      this.profileSelectedId = data.selected;
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
        this.store.dispatch(
          ProfilesActions.selectProfile({
            profile: found ? found : data.profiles[0],
          })
        );
        this.profileSelectedService.setProfileSelected(data.profiles[0].id);
      }

      if (data.loaded) {
        if (data.profiles.length > 0) {
          data.profiles.map((profile) => {
            if (profile.id && profile.phases === undefined) {
              // this.store.dispatch(
              //   PhasesActions.getPhasesByProfile({ profile_id: profile.id })
              // );
            }
          });
        } else {
          this.router.navigateByUrl('profile/new');
        }
      }

      if (this.profileSelectedId !== data.selected && data.selected) {
        this.profileSelectedId = data.selected;
      }
    });
  }
}
