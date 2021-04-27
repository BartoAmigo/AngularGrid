
import { state } from '@angular/animations';
import { Component,OnInit,ViewChildren,QueryList, Input} from '@angular/core';
import * as XLSX from "xlsx";
import { AdmingridComponent } from '../admingrid/admingrid.component';
import {GetDataFromWorkbookService} from 'services/get-data-from-workbook.service'
import {DatabaseService} from 'services/database.service'

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css'],
})
export class AdminpageComponent implements OnInit {
  @ViewChildren(AdmingridComponent) child:QueryList<AdmingridComponent>;
  currentGrid:number;
  somebool:boolean;
  indexArr: Number[] = [];
  ifExcelFile:boolean = false;
  ifGridControlBox:boolean = false;
  height = screen.height - (.20*screen.height);
  width = screen.width - (.20*screen.height);

  
  ngOnInit(): void { 
  }
  
  constructor(private workbookservice:GetDataFromWorkbookService,public db:DatabaseService) {
    db.databaseChanges.subscribe(value=>{
      this.somebool=value;
    })
  }

  receiveData($event){
    let excelsheet:XLSX.WorkBook = $event;
    this.workbookservice.setData(excelsheet);
  
  }
  
  tabChanged($event){
    this.currentGrid = $event;
    document.getElementById("gridcontainer").setAttribute("style",this.getGridStyle());
  }

  resetGrid(){
    this.child.get(this.currentGrid).resetState();
  }
  exportState(){
    this.child.get(this.currentGrid)
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
   let HTMLSTRING = ("width:"+this.width+"px;"+"height:"+this.height+"px;margin:auto;")
   return HTMLSTRING;
 }
  controlClick($event){
    var list = $event.srcElement.parentNode.parentNode;
    var money = $event;
    if (list.style.overflow === "auto") {
      list.setAttribute("style","height:30px;width:15%;overflow:hidden;margin:auto");
    }
    else {
      list.setAttribute("style","height:fit-content;width:25%;overflow:auto;margin:auto");
    }
  }

  boxClick($event){
    this.ifGridControlBox = !this.ifGridControlBox;
    $event.srcElement.classList.toggle("active");
    
  }

  controlChange(){
    const form = <HTMLFormElement>(document.querySelector("#controls"));

      const data = new FormData(form);
      const choice = data.get('choice') as string;
      console.log(choice);
      switch(choice)
      {
        case ("export"):{
          this.exportState();
          break;
        }
        case ("reset"):{
          this.resetGrid();
          break;
        }
        case ("addrow"):{
          this.addARow();
          break;
        }
        case ("deleterow"):{
          this.deleteRow();
          break;
        }
      }
    
    return false;
  }
}