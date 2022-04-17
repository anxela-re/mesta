import { TestBed } from '@angular/core/testing';

import { ComponentsServiceService } from './components.service';

describe('ComponentsServiceService', () => {
  let service: ComponentsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
