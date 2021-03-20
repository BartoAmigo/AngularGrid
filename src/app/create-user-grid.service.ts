import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx'
@Injectable({
  providedIn: 'root'
})
export class CreateUserGridService {
  workbook: XLSX.WorkBook;
  excelData: [][];
  constructor() { }

  setData(someWorkbook: XLSX.WorkBook, someData:[][]){
    this.workbook = someWorkbook; 
    this.excelData = someData; 
  }
  getWorkbook(){
    return this.workbook; 
  }
  getExcelData(){
    return this.excelData; 
  }
}
