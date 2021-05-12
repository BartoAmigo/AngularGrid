import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/*
ColsFromExcelService Service: is a service that creates a columns for database and columnsForRows object for rows-from-excel.service.
*/
export class ColsFromExcelService {
  constructor() {}
  /*
  getColumnsFromExcelFile function: this function creates two objects and returns two objects. column object looks like = {field:column}. a columnForRows object = {A1:column}.  
  PARAMETERS: a worksheet from a workbook
  */
getColumnsFromExcelFile(excelWorkSheet):any{
  let columns = []; //place holder for columns object.
  let columnsForRows = []; //place holder for columnsForRows object.
  let col1 =0; //we use this for excel WorkSheets EX: B1:column. "hint: look at an excel file layout."
  let col2 =0; //we use this for excel worksheets EX: AA1:column
  let num = 0; //we use this num alphabet.  
  let i = 0;   //we use i for columns. to set a index for our column array.  
  let char = "A"; //starting character. we want A1 for first column.
  while(excelWorkSheet[char+1]){

      /*here we are pushing data from the excel worksheet into our columns array.*/
      columns.push({field:excelWorkSheet[char+1].w, /*excelWorkSheet[char+1] = (Aletter)1 posiiton on excel*/
        /*we are applying a tooltipfield to our columns* */
        tooltipField:excelWorkSheet[char+1].w,
        /*We are applying a color to our tooltipfield*/
        tooltipComponentParams: { color: '#ececec' },
        

      });
      /*Here we are making a column array based on excel format. This is needed for our row function.*/
      columnsForRows[char] = columns[i].field;
      i++; //increments index for columns
      /*Checks to see if it the workbook is longer than Z column*/
      if(i<26){
        num = char.charCodeAt(0);
        num++;
        char = String.fromCharCode(num); 
      }
      else
      {
        col1 = (i/26)+64;
        col2 = (i%26)+65;
        char = String.fromCharCode(col1)+String.fromCharCode(col2);
      }
    }
    /*returns columns object in the form {field:column} -> for DATABASE */
    /* returns columnsForRows object in the form {A:column} -> FOR ROWSERVICE */
  return {columns,columnsForRows}
  }
}



