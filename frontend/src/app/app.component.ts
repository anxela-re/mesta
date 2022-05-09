import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducers';
import * as UserActions from './user/actions';
import * as ProfilesActions from './profiles/actions';
import * as PhasesActions from './phases/actions';
import { ProfileSelectedService } from './profiles/services/profile-selected.service';

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
    private router: Router
  ) {
    this.store.select('auth').subscribe((data) => {
      console.info(data)
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
        console.info('app --> 49')
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

      // if (data.loaded && this.profileSelectedId === undefined) {
        // if (data.profiles.length > 0) {
        //   data.profiles.map((profile) => {
        //     if (profile.id && profile.phases === undefined) {
        //       this.store.dispatch(
        //         PhasesActions.getPhasesByProfile({ profile_id: profile.id })
        //       );
        //     }
        //   });
        // } else {
        //   this.router.navigateByUrl('profile/new');
        // }
        // if(data.profiles.length === 0) {
        //   this.router.navigateByUrl('profile/new')
        // }
      // }

      if (this.profileSelectedId !== data.selected && data.selected) {
        console.info('app --> 82')
        this.profileSelectedId = data.selected;
      }
    });
  }
}
