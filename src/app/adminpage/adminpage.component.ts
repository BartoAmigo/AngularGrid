import { Component, OnInit, ViewChild} from '@angular/core';
import { UserpageComponent } from 'app/userpage/userpage.component';
import * as XLSX from "xlsx";
import { AdmingridComponent } from '../admingrid/admingrid.component';
import { CreateUserGridService } from '../create-user-grid.service';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css'],
})
export class AdminpageComponent implements OnInit {
  @ViewChild(AdmingridComponent) child:AdmingridComponent; 
  @ViewChild(UserpageComponent) child2:UserpageComponent;
  role:boolean = false;
  columnDefs: [];
  columnsLoaded:boolean = false;
  public excelData: [][]; 
  excelSheet: XLSX.WorkBook;
  ifExcelFile:boolean = false;

  ngOnInit(): void { }

  receiveData($event){
    this.excelSheet = $event; 
    this.ifExcelFile=true;
  }
  receiveMatrixData($event){
    this.excelData = $event; 
  }

  resetGrid(){
    //this.child.resetState();
  }
  
  exportState(){
    this.child.sendCurrentColumnState();
    console.log(this.child);
    console.log(this.child2);
  }

  }

