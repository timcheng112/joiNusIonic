import { TestBed } from '@angular/core/testing';

import { NormalUserService } from './normaluser.service';

describe('UserService', () => {
  let service: NormalUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NormalUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
