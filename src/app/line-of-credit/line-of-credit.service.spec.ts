import { TestBed, inject } from '@angular/core/testing';

import { LineOfCreditService } from './line-of-credit.service';

describe('LineOfCreditService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LineOfCreditService]
    });
  });

  it('should be created', inject([LineOfCreditService], (service: LineOfCreditService) => {
    expect(service).toBeTruthy();
  }));
});
