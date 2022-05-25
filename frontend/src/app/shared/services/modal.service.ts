import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modals: any[] = [];

  constructor() { }

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
}
