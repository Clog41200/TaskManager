import { TestBed } from '@angular/core/testing';

import { TaskMessageService } from './task-message.service';

describe('TaskMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskMessageService = TestBed.get(TaskMessageService);
    expect(service).toBeTruthy();
  });
});
