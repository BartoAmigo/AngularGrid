<<<<<<< Updated upstream
import { Component, OnInit,Output,Input,EventEmitter } from '@angular/core';
=======
import { Grid, GridApi } from 'ag-grid-community';
import { Component, OnInit,Output,EventEmitter } from '@angular/core';
>>>>>>> Stashed changes
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-excelsheet',
  templateUrl: './excelsheet.component.html',
  styleUrls: ['./excelsheet.component.css']
})
export class ExcelsheetComponent implements OnInit {

  data: [][];
   wb: XLSX.WorkBook;
  @Output() dataEvent = new EventEmitter<any>();
<<<<<<< Updated upstream
  @Output() rowDataEvent = new EventEmitter<any>();
=======
  @Output() dataEvent2 = new EventEmitter<any>();
  ws: XLSX.WorkSheet;

>>>>>>> Stashed changes
  constructor() { }
  @Input() columns:[];

  ngOnInit(): void {
  }

  onFileChange(evt: any) {
    const target : DataTransfer =   <DataTransfer>(evt.target);
    
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname : string = wb.SheetNames[0];

<<<<<<< Updated upstream
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      
console.log(ws)
      this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
      this.populateGrid(wb);
    };
=======
      this.ws = wb.Sheets[wsname];
      this.data = (XLSX.utils.sheet_to_json(this.ws, { header: 1 }));
>>>>>>> Stashed changes

    }; 
    reader.readAsBinaryString(target.files[0]);

  }
  sendData(){
    this.dataEvent.emit(this.ws);
    this.dataEvent2.emit(this.data);
  }
<<<<<<< Updated upstream
  populateGrid(workbook :any){
    var firstSheetName = workbook.SheetNames[0];
    var worksheet = workbook.Sheets[firstSheetName];
    var rowData = [];

    // start at the 2nd row - the first row are the headers
    var rowIndex = 2;

    // iterate over the worksheet pulling out the columns we're expecting
    while (worksheet['A' + rowIndex]) {
        var row = {};
        console.log(this.columns);
        Object.keys(this.columns).forEach(function(column) {
            row[this.columns[column]] = worksheet[column + rowIndex].w;
            
        });
       
        rowData.push(row);

        rowIndex++;
        
    }
    
    this.rowDataEvent.emit(rowData);

    // finally, set the imported rowData into the grid
    
  }
}

=======

}
>>>>>>> Stashed changes
