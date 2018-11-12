import { TestBed } from '@angular/core/testing';

import { TaskItemValueService } from './task-item-value.service';

describe('TaskItemValueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskItemValueService = TestBed.get(TaskItemValueService);
    expect(service).toBeTruthy();
  });
});
