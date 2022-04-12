import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileSelectedService {
  constructor() {}

  getProfileSelected(): number | undefined {
    const selectedProfileStored = localStorage.getItem('selected_profile');
    if (selectedProfileStored) {
      return parseInt(selectedProfileStored);
    }
    return undefined;
  }

  setProfileSelected(profileId: number) {
    return localStorage.setItem('selected_profile', JSON.stringify(profileId));
  }
}
