import { TestBed } from '@angular/core/testing';

import { DepositosService } from './depositos.service';

describe('DepositosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DepositosService = TestBed.get(DepositosService);
    expect(service).toBeTruthy();
  });
});
