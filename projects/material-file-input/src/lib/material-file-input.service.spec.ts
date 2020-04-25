import { TestBed } from '@angular/core/testing';

import { MaterialFileInputService } from './material-file-input.service';

describe('MaterialFileInputService', () => {
  let service: MaterialFileInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialFileInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
