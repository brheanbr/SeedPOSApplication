/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdminAuthService } from './admin-auth.service';

describe('Service: AdminAuth', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminAuthService]
    });
  });

  it('should ...', inject([AdminAuthService], (service: AdminAuthService) => {
    expect(service).toBeTruthy();
  }));
});
