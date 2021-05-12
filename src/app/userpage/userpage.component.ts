
import { Component, OnInit,ViewChildren,QueryList} from '@angular/core';
import {UsergridComponent} from '../usergrid/usergrid.component'
import {DatabaseService} from 'services/database.service';
import {BehaviorSubject} from 'rxjs'

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements  OnInit {

  
  @ViewChildren(UsergridComponent) child:QueryList<UsergridComponent>;

  currGrid:number = 0; //Current grid that is displayed
  isDataSet:boolean = false; //database has been set false -> Database has not been set. True -> Database hsa been set.
  ifGridControlBox:boolean = false; //enables display of gridcontrolbox
  height = screen.height - (.20*screen.height);
  width = screen.width - (.20*screen.height);

  constructor(public db:DatabaseService) {
    /*This just subscribes to a subject to see if database has been set.*/
    db.databaseSet.subscribe(value =>{
      this.isDataSet=value;
    })
    if(this.isDataSet==true){
      db.currWorkSheet.next(db.database[0].getSheetName())
    }
  }

  ngOnInit(): void {
  }
  /*progressColor function: This just calls usergrid's method progressColor()*/
  progressColor(){
  }
  addARow(){
    this.child.get(this.currGrid).addNewRowItem();
    this.db.databaseChanges.next(true);
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
  
//changes the grid when you click on a different tag.
  tabChanged($event){
    this.db.currWorkSheet.next(this.db.database[$event].getSheetName());
    this.currGrid = $event;
  }
  
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
        case ("1"):{
          this.addARow();
          break;
        }
        
      }
    
    return false;
  }


}
