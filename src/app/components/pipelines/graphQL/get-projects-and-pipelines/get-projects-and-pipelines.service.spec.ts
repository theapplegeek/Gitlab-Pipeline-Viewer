import { TestBed } from '@angular/core/testing';

import { GetProjectsAndPipelinesService } from './get-projects-and-pipelines.service';

describe('GetProjectsAndPipelinesService', () => {
  let service: GetProjectsAndPipelinesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetProjectsAndPipelinesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
