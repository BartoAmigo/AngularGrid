
import { Component, OnInit,Output,EventEmitter, Input } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-excelsheet',
  templateUrl: './excelsheet.component.html',
  styleUrls: ['./excelsheet.component.css']
})
export class ExcelsheetComponent implements OnInit {

  @Input() role:boolean = false; 
  data: [][];
   wb: XLSX.WorkBook;
  @Output() dataEvent = new EventEmitter<any>();
  @Output() dataEvent2 = new EventEmitter<any>();
  ws: XLSX.WorkSheet;
 

  constructor() { }
  @Input() columns:[];

  ngOnInit(): void {
  }
/**the excel input code that allows the admin to acess their documents, select an excel file, and import it into the grid.
 * the code will read the inputed file using the XLSX reader library. It grabs the worksheets and emits the data to the admingrid
 * component to be inputted into the admin grid
*/
  onFileChange(evt: any) {
    const target : DataTransfer =   <DataTransfer>(evt.target);
    
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
     this.wb = XLSX.read(bstr, { type: 'binary' });

      const wsname : string = this.wb.SheetNames[0];

      this.ws = this.wb.Sheets[wsname];
      this.data = (XLSX.utils.sheet_to_json(this.ws, { header: 1 }));

    }; 
    reader.readAsBinaryString(target.files[0]);
    setTimeout(() => {
      this.dataEvent.emit(this.wb);
      this.dataEvent2.emit(this.data);
    },2000);
    
  }
}
