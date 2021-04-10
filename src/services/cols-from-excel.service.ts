import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColsFromExcelService {
  constructor() {}

getColumnsFromExcelFile(excelWorkSheet):any{
  let columns = []; 
  let columnsForRows = [];
  let col1 =0;
  let col2 =0;
  let num = 0;
  let i = 0;
  let char = "A";
  while(excelWorkSheet[char+1]){

      columns.push({field:excelWorkSheet[char+1].w});
      columnsForRows[char] = columns[i].field;

      if(i<26){
        num = char.charCodeAt(0);
        num++;
        char = String.fromCharCode(num); 
      }
      else{
        col1 = (i/26)+64;
        col2 = (i%26)+65;
        char = String.fromCharCode(col1)+String.fromCharCode(col2);
      }
      i++;
    }
    console.log(columns);
    console.log(columnsForRows);
  return {columns,columnsForRows}
  }
}
  

  /*let char = "A"; 
  let num = 0; 
  let col1 = 0; 
  let col2 = 0;
  let columns = [];
  let columnsForRows = [];
  for(var i = 0;i <excelData[0].length;i++)
  {
    columns.push({field:excelData[0][i]});
    columnsForRows[char] = columns[i].field;
    if(i<26){
      num = char.charCodeAt(0);
      num++;
      char = String.fromCharCode(num);
    }
    else
    {
      col1 = (i/26) + 64;
      col2 = (i%26) + 65; 
      char = String.fromCharCode(col1) + String.fromCharCode(col2); 
    }
  }
  */


