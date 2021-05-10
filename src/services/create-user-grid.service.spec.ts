import { TestBed } from '@angular/core/testing';

import { CreateUserGridService } from './create-user-grid.service';

describe('CreateUserGridService', () => {
  let service: CreateUserGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateUserGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
