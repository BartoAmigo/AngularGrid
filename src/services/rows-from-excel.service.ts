import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RowsFromExcelService {
  constructor() { }
  
  populateRows( excelWorksheet, columns):any{
    let rowData = [];
    let rowIndex = 2;
    while(excelWorksheet['A' + rowIndex]) {
      let row = {};
      Object.keys(columns).forEach(function(column) {
        if(excelWorksheet[column+rowIndex]){
          row[columns[column]] = excelWorksheet[column + rowIndex].w;
          }
    });
    rowData.push(row); 
    rowIndex++;
  }
  return rowData;
  }
}
