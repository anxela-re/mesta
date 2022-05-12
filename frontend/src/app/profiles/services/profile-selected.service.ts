import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { ProfileDTO } from '../models/profile.dto';

@Injectable({
  providedIn: 'root',
})
export class ProfileSelectedService {
  profile!: ProfileDTO | undefined;
  constructor(private store: Store<AppState>) {
    this.store.select('profiles').subscribe((profilesState) => {
      console.info('profile selected');
      if (profilesState.selected !== undefined && this.profile?.id !== profilesState.selected) {
        this.profile = profilesState.profiles.find(
          (p) => p.id === profilesState.selected
        );
      }
    });
  }

  getProfileSelectedStored(): number | undefined {
    const selectedProfileStored = localStorage.getItem('selected_profile');
    if (selectedProfileStored) {
      return parseInt(selectedProfileStored);
    }
    return undefined;
  }

  getProfileSelected(): ProfileDTO | undefined {
    return this.profile;
  }

  setProfileSelected(profileId: number) {
    return localStorage.setItem('selected_profile', JSON.stringify(profileId));
  }

  removeSelection() {
    localStorage.removeItem('selected_profile');
  }
}
