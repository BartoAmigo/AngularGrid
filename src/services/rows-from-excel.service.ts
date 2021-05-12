import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/*RowsFromExcelService service: this will return rows from an excelworksheet for Database*/
export class RowsFromExcelService {
  constructor() { }
  /*populateRows function: this function will return a row object
  PARAMETERS: an excelworksheet and a columns from our colService. columns is in the format = {A:column}
  */
  populateRows( excelWorksheet, columns):any{
    let rowData = []; /*place holder for rowData object */
    let rowIndex = 2; /*rowIndex is places to two automatically because row data starts on the second row in an excel worksheet. SEE a excel worksheet layout*/
    while(excelWorksheet['A' + rowIndex]) {
      let row = {}; /*placeholder for a row object we are going to push into our rows object*/
      /*For each function to get the keys from our columns. from {A:column} will get A and not column. because A is the key*/
      Object.keys(columns).forEach(function(column) {
        if(excelWorksheet[column+rowIndex]){
          row[columns[column]] = excelWorksheet[column + rowIndex].w; //creates a row object here and sets it to a value from an excelworksheet
          }
    });
    rowData.push(row); /*pushes row into our rowData object*/
    rowIndex++; /* increments row index to traverse through worksheet. */
  }
  return rowData; /*returns rowData object FOR DATABASE*/
  }
}
