import { TestBed } from '@angular/core/testing';

import { ServiceBackend } from './service.backend';
import {HttpClientModule} from '@angular/common/http';

describe('ServiceBackend', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientModule ]
  }));

  it('should be created', () => {
    const service: ServiceBackend = TestBed.get(ServiceBackend);
    expect(service).toBeTruthy();
  });
});
