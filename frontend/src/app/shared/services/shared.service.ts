import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { CompositionDTO } from 'src/app/compositions/models/composition.dto';
import { PropertyDTO } from 'src/app/properties/models/property.dto';

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
  private modals: any[] = [];
  constructor() {}

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

  getCompositionById(
    compositions: CompositionDTO[],
    id: number | undefined
  ): CompositionDTO | undefined {
    return id ? compositions.find((c) => c.id === id) : undefined;
  }

  addModal(modal: any) {
    this.modals.push(modal);
  }

  getModals(): any {
    return this.modals;
  }

  removeModal(id: string) {
    this.modals = this.modals.filter((x) => x.id !== id);
  }

  openModal(id: string, title: string, content: string) {
    const modal = this.modals.find((x) => x.id === id);
    modal.open(title, content);
  }

  closeModal(id: string) {
    const modal = this.modals.find((x) => x.id === id);
    modal.close();
  }

  updateTheme() {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    const customE = new CustomEvent('changeTheme');
    window.dispatchEvent(customE);
  }

  changeTheme(mode: string | undefined) {
    if (mode === undefined) {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', mode);
    }
    this.updateTheme();
  }

  toggleTheme() {
    localStorage.setItem(
      'theme',
      localStorage.theme === 'dark' ? 'light' : 'dark'
    );
    this.updateTheme();
  }
}
