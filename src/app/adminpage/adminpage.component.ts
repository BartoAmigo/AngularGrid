import { Component, OnInit } from '@angular/core';
import * as XLSX from "xlsx";
@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {
  public excelData: [][]; 
  excelSheet: XLSX.WorkBook;
  ifExcelFile:boolean = false;
  constructor() { }

  ngOnInit(): void {

  }

  receiveData($event){
    this.excelSheet = $event; 
    this.ifExcelFile=true;
  }
  receiveMatrixData($event){
    this.excelData = $event; 
  }

}
