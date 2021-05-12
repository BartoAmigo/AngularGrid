
import { Component,OnInit,ViewChildren,QueryList} from '@angular/core';
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
  currentGrid:number = 0; //this gives us the current admingridComponent we are viewing on the screen.
  somebool:boolean; //is triggered when our fake database has been modified by a user.
  //indexArr: Number[] = [];
  ifExcelFile:boolean = false; //is triggered when a file has been accessed by our excel component. FALSE -> Excel component displayed. TRUE -> excel component not displayed.
  ifGridControlBox:boolean = false; //this enables our grid controls on our admin page. FALSE -> gridbox not displayed. TRUE -> gridbox is displayed
  height = screen.height - (.20*screen.height); 
  width = screen.width - (.20*screen.height);

  ngOnInit(): void { 
  }
  
  constructor(private workbookservice:GetDataFromWorkbookService,public db:DatabaseService) {
    /* see database.service.ts */ 
    db.databaseChanges.subscribe(value=>{
      this.somebool=value; //race condition that is triggered SUBSCRIBES to databaseChanges FALSE -> No Changes, TRUE -> Changes
    });
    
    /* see database.service.ts 
    This subscribe just tells us we already uploaded an excel file.*/
    db.databaseSet.subscribe(value=>{
      if(value==true){
        this.ifExcelFile=true; 
        this.ifGridControlBox=true; 
        db.currWorkSheet.next(db.database[0].getSheetName());
      }
    });
  }
/*
receieveData function: is the receiver of an output() emitted by the excelsheet component
see excelComponent to see what data is being passed with $event
we are getting the workbook here from $event
*/
  receiveData($event){
    this.ifExcelFile = true; //toggles to not display excelComponent
    let excelsheet:XLSX.WorkBook = $event;
    /*See get-data-from-workbook.service.ts*/
    this.workbookservice.setData(excelsheet);
  }
  /*tabChanged function: is the reciever of an output() emitted by clicking on a matTab
  $event here just gives you the index of the current admingrid you are viewing*/
  tabChanged($event){
    this.currentGrid = $event;
    this.db.currWorkSheet.next(this.db.database[$event].getSheetName());
    //document.getElementById("gridcontainer").setAttribute("style",this.getGridStyle()); //set default grid sizing. 
  }

  /*resetGrid function: this calls on a admingrid component's method resetState()*/ 
  resetGrid(){
    this.child.get(this.currentGrid).resetState();
  }
  /*addARow function: this calls on admingrid's component method addARow() */
 addARow(){
   this.child.get(this.currentGrid).addNewRowItem();
 }
 /*deleteRow function: this calls on admingrid's component method addNewRowItem()*/
 deleteRow(){
   this.child.get(this.currentGrid).deleteRowItem();
 }

 /*gridSizeUp function: increase gridsize */ 
 gridSizeUp(){
   this.height += .10 *screen.height;
   this.width  += .10 *screen.width;
   document.getElementById("gridcontainer").setAttribute("style",this.getGridStyle());
 }
 /*gridSizeDown function: decrease gridsize */
 gridSizeDown(){
  this.height -= .10 *screen.height;
  this.width  -= .10 *screen.width;
  document.getElementById("gridcontainer").setAttribute("style",this.getGridStyle());
 }

 /*getGridStyle function: returns a string that is just CSS for a setAttribute function*/
 getGridStyle():string{
   let CSSSTRING = ("width:"+this.width+"px;"+"height:"+this.height+"px;margin:auto;")
   return CSSSTRING;
 }
 /*controlClick function: a reciever of an output by gridControls for simple resizing of boxes*/
  controlClick($event){
    var list = $event.srcElement.parentNode.parentNode;
    var money = $event;
    if (list.style.overflow === "auto") {
      list.setAttribute("style","height:30px;width:10%;overflow:hidden;margin:auto");
    }
    else {
      list.setAttribute("style","height:fit-content;width:20%;overflow:auto;margin:auto");
    }
  }
/*boxClick function: a reciever of an output by gridControl for toggling display*/
  boxClick($event){
    this.ifGridControlBox = !this.ifGridControlBox;
    $event.srcElement.classList.toggle("active");
    
  }
/*controlChange function: controller for our gridControls*/
  controlChange(){
    const form = <HTMLFormElement>(document.querySelector("#controls"));

      const data = new FormData(form);
      const choice = data.get('choice') as string;
      switch(choice)
      {
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
  /*controlChange function: controller for gridSizeControls*/
  controlChange2(){
    const form = <HTMLFormElement>(document.querySelector("#format"));

    const data = new FormData(form);
    const choice = data.get('choice') as string;
    this.child.get(this.currentGrid).colorGrid(choice, this.currentGrid);
    return false;
  }
}