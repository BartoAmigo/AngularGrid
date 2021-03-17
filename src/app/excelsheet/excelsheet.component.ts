import { Grid, GridApi } from 'ag-grid-community';
import { Component, OnInit,Output,EventEmitter, Input } from '@angular/core';
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
  @Output() dataEvent2 = new EventEmitter<any>();
  ws: XLSX.WorkSheet;

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

      this.ws = wb.Sheets[wsname];
      this.data = (XLSX.utils.sheet_to_json(this.ws, { header: 1 }));

    }; 
    reader.readAsBinaryString(target.files[0]);

  }
  sendData(){
    this.dataEvent.emit(this.ws);
    this.dataEvent2.emit(this.data);
  }

}
