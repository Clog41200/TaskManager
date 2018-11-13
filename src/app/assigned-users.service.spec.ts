import { TestBed } from '@angular/core/testing';

import { AssignedUsersService } from './assigned-users.service';

describe('AssignedUsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssignedUsersService = TestBed.get(AssignedUsersService);
    expect(service).toBeTruthy();
  });
});
