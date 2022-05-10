import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { AppState } from 'src/app/app.reducers';
import { CompositionDTO } from 'src/app/compositions/models/composition.dto';
import { PropertyDTO } from 'src/app/properties/models/property.dto';
import { PhaseDTO } from 'src/app/phases/models/phase.dto';
import { ProfileDTO } from 'src/app/profiles/models/profile.dto';

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
  constructor(private store: Store<AppState>) {
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

  async managementToast(valid: boolean, msg: string): Promise<void> {
    const feedback = document.getElementById('feedback');
    const feedbackMsg = document.getElementById('feedback-msg');
    if (feedback && feedbackMsg) {
      feedbackMsg.textContent = msg;
      if (valid) {
        feedback.className = feedback.className.replace(
          '-translate-y-full',
          'transform-none'
        );
        feedback.className = feedback.className.replace('p-0', 'p-2');
        feedback.className = feedback.className.concat(' bg-success');
        await this.wait(5000);
        feedback.textContent = '';
        feedback.className = feedback.className.replace(
          'transform-none',
          '-translate-y-full'
        );
        feedback.className = feedback.className.replace('p-2', 'p-0');
        feedback.className = feedback.className.replace('bg-success', '');
      } else {
        feedback.className = feedback.className.replace(
          '-translate-y-full',
          'transform-none'
        );
        feedback.className = feedback.className.replace('p-0', 'p-2');
        feedback.className = feedback.className.concat(' bg-danger');
        await this.wait(5000);
        feedback.textContent = '';
        feedback.className = feedback.className.replace(
          'transform-none',
          '-translate-y-full'
        );
        feedback.className = feedback.className.replace('p-2', 'p-0');
        feedback.className = feedback.className.replace('bg-danger', '');
      }
    }
  }

  errorLog(error: ResponseError): void {
    console.error(error);
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

  getPropertiesById(
    props: PropertyDTO[],
    propertiesId: number[]
  ): PropertyDTO[] {
    const properties: PropertyDTO[] = [];

    propertiesId.forEach((id) => {
      const found = props.find((p) => p.id === id);
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

  getCompositionById(
    compositions: CompositionDTO[],
    id: number | undefined
  ): CompositionDTO | undefined {
    return id ? compositions.find((c) => c.id === id) : undefined;
  }

  getPhaseById(phases: PhaseDTO[], id: number): PhaseDTO | undefined {
    return id ? phases.find((p) => p.id === id) : undefined;
  }
}
