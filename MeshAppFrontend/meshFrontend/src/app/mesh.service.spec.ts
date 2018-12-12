import { TestBed } from '@angular/core/testing';

import { MeshService } from './mesh.service';

describe('MeshService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MeshService = TestBed.get(MeshService);
    expect(service).toBeTruthy();
  });
});
