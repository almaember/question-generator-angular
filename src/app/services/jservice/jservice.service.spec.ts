import { TestBed } from '@angular/core/testing';

import { JserviceService } from './jservice.service';

describe('JserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JserviceService = TestBed.get(JserviceService);
    expect(service).toBeTruthy();
  });
});
