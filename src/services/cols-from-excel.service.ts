import { CustomTooltipComponent } from './../app/custom-tooltip/custom-tooltip.component';
import { Injectable } from '@angular/core';
import { TooltipFeature } from 'ag-grid-community';

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

      columns.push({field:excelWorkSheet[char+1].w,
        tooltipField:excelWorkSheet[char+1].w,
        tooltipComponentParams: { color: '#ececec' },

      });
      columnsForRows[char] = columns[i].field;
      i++;

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
  return {columns,columnsForRows}
  }
}



