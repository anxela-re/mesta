import { TestBed } from '@angular/core/testing';

import { CompositionsService } from './compositions.service';

describe('CompositionsService', () => {
  let service: CompositionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompositionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
