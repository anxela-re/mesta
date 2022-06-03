import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalService } from '../../services/modal.service';

import { ModalComponent } from './modal.component';
class modalClass {
  addModal = jasmine.createSpy('addModal');
  openModal = jasmine.createSpy('openModal');
  closeModal = jasmine.createSpy('closeModal');
  modals = [
    {
      id: 'modal',
      open: () => {},
      close: () => {},
    },
  ];
}
class MockElementRef extends ElementRef {}
describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let modalService: ModalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
      providers: [
        { provide: ElementRef, useClass: MockElementRef },
        { provide: ModalService, useClass: modalClass },
      ],
    }).compileComponents();
    modalService = TestBed.inject(ModalService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an id', () => {
    component.id = 'modal';

    expect(modalService.addModal).toHaveBeenCalled();
  });

  it('should display', () => {
    const modal = component.getModal();
    component.open('modal title', 'modal content');

    expect(modal.style.display).toBe('block');
  });

  it('should hide', () => {
    const modal = component.getModal();
    component.close(false);

    expect(modal.style.display).toBe('none');
  });
});
