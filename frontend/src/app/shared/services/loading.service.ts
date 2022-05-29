import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading: any;
  private loadingIds: string[] = [];

  constructor() {}

  addLoading(loading: any) {
    this.loading = loading;
  }

  getLoading(): any {
    return this.loading;
  }

  removeLoading(): void {
    this.loading = undefined;
  }

  showLoading(id: string): void {
    this.loadingIds.push(id);
    this.loading.show();
  }

  hideLoading(id: string): void {
    this.loadingIds = this.loadingIds.filter(
      (loadingId: string) => loadingId !== id
    );
    if (this.loadingIds.length === 0) {
      this.loading.hide();
    }
  }
}
