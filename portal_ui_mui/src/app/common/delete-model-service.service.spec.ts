import { TestBed } from '@angular/core/testing';

import { DeleteModelServiceService } from './delete-model-service.service';

describe('DeleteModelServiceService', () => {
  let service: DeleteModelServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteModelServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
