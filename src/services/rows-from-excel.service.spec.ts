import { TestBed } from '@angular/core/testing';

import { RowsFromExcelService } from './rows-from-excel.service';

describe('RowsFromExcelService', () => {
  let service: RowsFromExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RowsFromExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
