import { TestBed } from '@angular/core/testing';

import { ModalService } from './modal.service';

describe('ModalService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should add modal', () => {
    const modal = { id: '1' };
    service.addModal(modal);
    expect(service.getModals()).toEqual([modal]);
  });
  it('should get modals', () => {
    const modal = { id: '1' };
    service.addModal(modal);
    const modals = service.getModals();
    expect(modals).toEqual([modal]);
  });
  it('should remove modal', () => {
    const modal = { id: '1' };
    service.addModal(modal);
    service.removeModal(modal.id);
    expect(service.getModals().length).toBe(0);
  });
  it('should open modal', () => {
    const modal = { id: '1', open: jasmine.createSpy('open') };
    service.addModal(modal);
    service.openModal(modal.id, 'titulo', 'contenido')
    expect(modal.open).toHaveBeenCalled();
  });
  it('should close modal', () => {
    const modal = { id: '1', open: jasmine.createSpy('open'), close: jasmine.createSpy('open') };
    service.addModal(modal);
    service.closeModal(modal.id)
    expect(modal.close).toHaveBeenCalled();
  });
});
