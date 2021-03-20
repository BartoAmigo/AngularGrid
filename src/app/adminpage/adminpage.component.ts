import { Component, OnInit } from '@angular/core';
import * as XLSX from "xlsx";
import { CreateUserGridService } from '../create-user-grid.service';
@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {
  role:boolean = false; 
  public excelData: [][]; 
  excelSheet: XLSX.WorkBook;
  ifExcelFile:boolean = false;

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
