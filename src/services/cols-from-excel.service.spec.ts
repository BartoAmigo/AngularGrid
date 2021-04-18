import { TestBed } from '@angular/core/testing';

import { ColsFromExcelService } from './cols-from-excel.service';

describe('ColsFromExcelService', () => {
  let service: ColsFromExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColsFromExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
