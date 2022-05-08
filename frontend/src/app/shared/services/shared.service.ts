import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { AppState } from 'src/app/app.reducers';
import * as AuthActions from 'src/app/auth/actions';
import * as CompositionsActions from 'src/app/compositions/actions';
import * as PropertiesActions from 'src/app/properties/actions';
import * as PhasesActions from 'src/app/phases/actions';
import { TokenService } from 'src/app/auth/services/token.service';
import { CompositionDTO } from 'src/app/compositions/models/composition.dto';
import { PropertyDTO } from 'src/app/properties/models/property.dto';
import { PhaseDTO } from 'src/app/phases/models/phase.dto';
import { ProfileDTO } from 'src/app/profiles/models/profile.dto';
import { ProfileSelectedService } from 'src/app/profiles/services/profile-selected.service';

export type IQuery = {
  [key: string]: string | number | string[];
};
export interface ResponseError {
  error: string;
}

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  propertiesProfile: PropertyDTO[] = [];
  profileSelectedId!: number;
  phasesProfile!: PhaseDTO[];
  compositionsProfile!: CompositionDTO[];
  profileSelected!: ProfileDTO;
  constructor(
    private store: Store<AppState>,
    private tokenService: TokenService,
    private profileSelectedService: ProfileSelectedService
  ) {
    this.store.select('profiles').subscribe((profilesState) => {
      if (
        (profilesState.loaded && profilesState.selected) ||
        (this.profileSelectedId &&
          profilesState.selected &&
          this.profileSelectedId !== profilesState.selected)
      ) {
        this.profileSelectedId = profilesState.selected;
        const profileFound = profilesState.profiles.find(
          (p) => p.id === profilesState.selected
        );
        if (profileFound) {
          this.profileSelected = profileFound;
        }
      }
    });

    this.store.select('compositions').subscribe((compositionsState) => {
      if (compositionsState.loaded) {
        this.compositionsProfile = compositionsState.compositions;
      }
    });
    this.store.select('properties').subscribe((properties) => {
      if (properties.loaded) {
        this.propertiesProfile = properties.properties;
      }
    });
    this.store.select('phases').subscribe((phasesState) => {
      if (phasesState.loaded) {
        this.phasesProfile = phasesState.phases;
      }
    });
  }

  async managementToast(
    element: string,
    validRequest: boolean,
    error?: ResponseError
  ): Promise<void> {
    const toastMsg = document.getElementById(element);
    if (toastMsg) {
      if (validRequest) {
        toastMsg.className = 'show requestOk';
        toastMsg.textContent = 'Form submitted successfully.';
        await this.wait(2500);
        toastMsg.className = toastMsg.className.replace('show', '');
      } else {
        toastMsg.className = 'show requestKo';
        // if (error?.messageDetail) {
        //   toastMsg.textContent =
        //     'Error on form submitted, show logs. Message: ' +
        //     error?.message +
        //     '. Message detail: ' +
        //     error?.messageDetail +
        //     '. Status code: ' +
        //     error?.statusCode;
        // } else {
        //   toastMsg.textContent =
        //     'Error on form submitted, show logs. Message: ' +
        //     error?.message +
        //     '. Status code: ' +
        //     error?.statusCode;
        // }

        await this.wait(2500);
        toastMsg.className = toastMsg.className.replace('show', '');
      }
    }
  }

  errorLog(error: ResponseError): void {
    console.error(error);
    if (error.error.includes('Unauthenticated')) {
      this.store.dispatch(AuthActions.logout());
      this.tokenService.removeToken();
      this.profileSelectedService.removeSelection();
    }
  }

  async wait(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  formatQuery(query?: IQuery): string {
    let queryString = '';
    if (query) {
      Object.keys(query).forEach((q) => {
        if (query[q] && query[q] !== '') {
          queryString = queryString.concat(
            `${q}=${encodeURIComponent(`${query[q]}`)}`,
            '&'
          );
        }
      });
    }
    return queryString.slice(0, -1);
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }

  getPropertiesById(propertiesId: number[]): PropertyDTO[] {
    const properties: PropertyDTO[] = [];

    propertiesId.forEach((id) => {
      const found = this.propertiesProfile.find((p) => p.id === id);
      if (found) {
        properties.push(found);
      }
    });

    return properties;
  }

  getProfileSelectedId(): number {
    return this.profileSelectedId;
  }

  getProfileSelected(): ProfileDTO {
    return this.profileSelected;
  }

  getPhasesProfile(): PhaseDTO[] {
    return this.phasesProfile;
  }

  getCompositionsProfile(): CompositionDTO[] {
    return this.compositionsProfile;
  }

  getCompositionById(id: number | undefined): CompositionDTO | undefined {
    return id ? this.compositionsProfile.find((c) => c.id === id) : undefined;
  }
}
