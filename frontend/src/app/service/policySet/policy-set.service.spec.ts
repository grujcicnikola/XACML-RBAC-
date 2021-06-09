import { TestBed } from '@angular/core/testing';

import { PolicySetService } from './policy-set.service';

describe('PolicySetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PolicySetService = TestBed.get(PolicySetService);
    expect(service).toBeTruthy();
  });
});
