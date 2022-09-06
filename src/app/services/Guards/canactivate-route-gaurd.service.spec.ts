import { TestBed } from '@angular/core/testing';

import { CanactivateRouteGaurdService } from './canactivate-route-gaurd.service';

describe('CanactivateRouteGaurdService', () => {
  let service: CanactivateRouteGaurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanactivateRouteGaurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
