import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx'
@Injectable({
  providedIn: 'root'
})
export class CreateUserGridService {
  workbook: XLSX.WorkBook;
  excelData: [][];
  rowDefs = [];
  colDefs = [];
  constructor() { }

  setData(someWorkbook: XLSX.WorkBook, someData:[][],someRowDefs= [],someColDefs = []){
    this.workbook = someWorkbook; 
    this.excelData = someData; 
    this.rowDefs = someRowDefs;
    this.colDefs = someColDefs; 
  }
  getWorkbook(){
    return this.workbook; 
  }
  getExcelData(){
    return this.excelData; 
  }
  getRowDefs(){
    return this.rowDefs; 
  }
  getColDefs(){
    return this.colDefs;
  }
}
