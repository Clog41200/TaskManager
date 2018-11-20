import { TestBed } from '@angular/core/testing';

import { DiagrammesService } from './diagrammes.service';

describe('DiagrammesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiagrammesService = TestBed.get(DiagrammesService);
    expect(service).toBeTruthy();
  });
});
