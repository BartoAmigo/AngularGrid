import { TestBed } from '@angular/core/testing';

import { GetDataFromWorkbookService } from './get-data-from-workbook.service';

describe('GetDataFromWorkbookService', () => {
  let service: GetDataFromWorkbookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetDataFromWorkbookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
