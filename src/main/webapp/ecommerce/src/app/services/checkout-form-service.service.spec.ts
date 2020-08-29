import { TestBed } from '@angular/core/testing';

import { CheckoutFormServiceService } from './checkout-form-service.service';

describe('CheckoutFormServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckoutFormServiceService = TestBed.get(CheckoutFormServiceService);
    expect(service).toBeTruthy();
  });
});
