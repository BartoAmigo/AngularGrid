
import { Component,OnInit,ViewChildren,QueryList, Input} from '@angular/core';
import * as XLSX from "xlsx";
import { AdmingridComponent } from '../admingrid/admingrid.component';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css'],
})
export class AdminpageComponent implements OnInit {
  @ViewChildren(AdmingridComponent) child:QueryList<AdmingridComponent>;
  @Input() currentGrid:number;
  role:boolean = false;
  columnDefs: [];
  columnsLoaded:boolean = false;
  public excelData: [][]; 
  excelSheet: XLSX.WorkBook;
  indexArr: Number[] = [];
  ifExcelFile:boolean = false;
  height = screen.height - (.20*screen.height);
  width = screen.width - (.20*screen.height);

  
  ngOnInit(): void { 
  }
  
  constructor() {}

  receiveData($event){
    this.excelSheet = $event; 
    this.ifExcelFile=true;
    this.createArray()
  
  }
  receiveMatrixData($event){
    this.excelData = $event; 
  }
  
  tabChanged($event){
    this.currentGrid = $event;
    document.getElementById("gridcontainer").setAttribute("style",this.getGridStyle());
  }

  resetGrid(){
    this.child.get(this.currentGrid).resetState();
  }
  exportState(){
    this.child.get(this.currentGrid).sendCurrentColumnState();
  }

 createArray(){
   let index = this.excelSheet.SheetNames.length
   for(let i = 0;i<index;i++){
     this.indexArr.push(i)
   }
 }

 addARow(){
   this.child.get(this.currentGrid).addNewRowItem();
 }
 deleteRow(){
   this.child.get(this.currentGrid).deleteRowItem();
 }
 gridSizeUp(){
   this.height += .10 *screen.height;
   this.width  += .10 *screen.width;
   document.getElementById("gridcontainer").setAttribute("style",this.getGridStyle());
 }
 gridSizeDown(){
  this.height -= .10 *screen.height;
  this.width  -= .10 *screen.width;
  document.getElementById("gridcontainer").setAttribute("style",this.getGridStyle());
 }
 getGridStyle():string{
   let HTMLSTRING = ("width:"+this.width+"px;"+"height:"+this.height+"px;")
   return HTMLSTRING;
 }
}
