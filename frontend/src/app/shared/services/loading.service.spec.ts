import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LoadingComponent } from '../components/loading/loading.component';

import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;
  let loadingEl = jasmine.createSpyObj('loading', ['show', 'hide']);

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add assing loading', () => {
    service.addLoading(loadingEl);
    expect(service.getLoading()).toEqual(loadingEl);
  });

  it('should return loading', () => {
    service.addLoading(loadingEl);
    const value = service.getLoading();
    expect(value).toEqual(loadingEl);
  });

  it('should show loading', () => {
    service.addLoading(loadingEl);
    service.showLoading('loading-1');
    expect(loadingEl.show).toHaveBeenCalled();
  });

  it('should hide loading', () => {
    service.addLoading(loadingEl);
    service.showLoading('loading-1');
    service.hideLoading('loading-1')
    expect(loadingEl.hide).toHaveBeenCalled();
  });

  it('should remove loading', () => {
    service.addLoading(loadingEl);
    service.removeLoading();
    expect(service.getLoading()).toBeUndefined();
  });
});
