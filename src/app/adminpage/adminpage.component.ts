import { Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { UserpageComponent } from 'app/userpage/userpage.component';
import * as XLSX from "xlsx";
import { AdmingridComponent } from '../admingrid/admingrid.component';
import { CreateUserGridService } from 'services/create-user-grid.service';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css'],
})
export class AdminpageComponent implements OnInit {
  @ViewChild(AdmingridComponent) child:AdmingridComponent; 
  role:boolean = false;
  columnDefs: [];
  columnsLoaded:boolean = false;
  public excelData: [][]; 
  excelSheet: XLSX.WorkBook;
  indexArr: Number[] = [];
  ifExcelFile:boolean = false;
  public index = 0;
  
  ngOnInit(): void { }

  receiveData($event){
    this.excelSheet = $event; 
    this.ifExcelFile=true;
    this.createArray()
  
  }
  receiveMatrixData($event){
    this.excelData = $event; 
  }

  resetGrid(){
    this.child.resetState();
  }
  
  exportState(){
    this.child.sendCurrentColumnState();
  }

 createArray(){
   this.index = this.excelSheet.SheetNames.length
   for(let i = 0;i<this.index;i++){
     this.indexArr.push(i)
   }
 }
}
