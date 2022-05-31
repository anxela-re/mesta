import { TestBed } from '@angular/core/testing';

import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;
  let toastEl: any;
  beforeEach(() => {
    toastEl = jasmine.createSpyObj('toast', ['show', 'hide']);

    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
    service.addToast(toastEl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add assing toast', () => {
    expect(service.getToast()).toEqual(toastEl);
  });

  it('should return toast', () => {
    const value = service.getToast();
    expect(value).toEqual(toastEl);
  });

  it('should show toast', () => {
    service.showToast(true, 'toast-content');
    expect(toastEl.show).toHaveBeenCalled();
  });

  it('should hide toast', () => {
    service.showToast(true, 'toast-content');
    service.hideToast();
    expect(toastEl.hide).toHaveBeenCalled();
  });

  it('should remove toast', () => {
    service.removeToast();
    expect(service.getToast()).toBeUndefined();
  });
});
