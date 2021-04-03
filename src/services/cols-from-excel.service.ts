import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColsFromExcelService {
  constructor() {}

getColumnsFromExcelFile(excelData:[][]):any{
  let char = "A"; 
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

  return {columns,columnsForRows}
}

resetColumns(){

}
}