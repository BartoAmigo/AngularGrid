import { Injectable } from '@angular/core';
import {ColsFromExcelService} from '../services/cols-from-excel.service';
import {RowsFromExcelService} from '../services/rows-from-excel.service';
import {DatabaseService} from '../services/database.service'
import {gridData} from '../interfaces/gridData'
import * as XLSX from 'xlsx'

@Injectable({
  providedIn: 'root'
})
/*GetDataFromWorkbookService serivce: this grabs the information from an Excel Workbook and converts it into a database.*/
export class GetDataFromWorkbookService {
  
  constructor(private colService:ColsFromExcelService,private rowService:RowsFromExcelService, private database:DatabaseService){ 

  }
  /*setData function:create an object columns from columns in a excel worksheet. Creates an object rows from rows in a excel worksheet. Then pushes columns,rows,and worksheet Name to
  the database in a gridData form. SEE interfaces/gridData.ts
  PARAMETERS: EXCEL WORKBOOK
  */
  setData(workbook:XLSX.WorkBook){
    /*columns is going to hold the columns we are going to push into a gridData element*/
    let columns; 
    /*rows is going to hold the rows we are going to push into a gridData element*/
    let rows;
    /*for loop to go through each individual worksheet in a workbook*/
    for(var i = 0;i<workbook.SheetNames.length;i++){
      /*caliing ColsFromExcelService SEE services/ColsFromExcelService.ts*/
      columns = this.colService.getColumnsFromExcelFile(workbook.Sheets[workbook.SheetNames[i]]);
      /*calling rowService SEE services/rowService.ts*/
      rows = this.rowService.populateRows(workbook.Sheets[workbook.SheetNames[i]],columns.columnsForRows);
      /*this pushes a gridData element into the database.*/  
      this.database.database.push(new gridData(workbook.SheetNames[i],columns.columns,rows));
      /*sets databaseSet from database service to true because we have accessed data.*/
      this.database.databaseSet.next(true);
    }
  }

}