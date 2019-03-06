import { TestBed } from '@angular/core/testing';

import { UpdateUserService } from './update.user.service';
import {HttpClientModule} from '@angular/common/http';

describe('UpdateUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientModule ]
  }));

  it('should be created', () => {
    const service: UpdateUserService = TestBed.get(UpdateUserService);
    expect(service).toBeTruthy();
  });
});
