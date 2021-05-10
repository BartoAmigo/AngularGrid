import { Injectable } from '@angular/core';
import {ColsFromExcelService} from '../services/cols-from-excel.service';
import {RowsFromExcelService} from '../services/rows-from-excel.service';
import {DatabaseService} from '../services/database.service'
import {gridData} from '../interfaces/gridData'
import * as XLSX from 'xlsx'

@Injectable({
  providedIn: 'root'
})
export class GetDataFromWorkbookService {
  
  constructor(private colService:ColsFromExcelService,private rowService:RowsFromExcelService, private database:DatabaseService){ 

  }
  
  setData(workbook:XLSX.WorkBook){
    let columns; 
    let rows;
    for(var i = 0;i<workbook.SheetNames.length;i++){
      columns = this.colService.getColumnsFromExcelFile(workbook.Sheets[workbook.SheetNames[i]]);
      rows = this.rowService.populateRows(workbook.Sheets[workbook.SheetNames[i]],columns.columnsForRows);  
      this.database.database.push(new gridData(workbook.SheetNames[i],columns.columns,rows));
      this.database.databaseSet.next(true);
    }
  }

}