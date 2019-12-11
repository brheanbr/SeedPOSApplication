/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { POSService } from './POS.service';

describe('Service: POS', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [POSService]
    });
  });

  it('should ...', inject([POSService], (service: POSService) => {
    expect(service).toBeTruthy();
  }));
});
