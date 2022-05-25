import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toast: any;

  constructor() {}

  addToast(toast: any) {
    this.toast = toast;
  }

  getToast(): any {
    return this.toast;
  }

  removeToast() {
    this.toast = undefined;
  }

  async showToast(success: boolean, content: string ) {
    this.toast.show(content, success);
    await this.wait(5000);
    this.toast.hide();
  }

  hideToast() {
    this.toast.hide();
  }
  async wait(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}
