
import { Component, OnInit,ViewChildren,QueryList} from '@angular/core';
import {UsergridComponent} from '../usergrid/usergrid.component'
import {DatabaseService} from 'services/database.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements  OnInit {
  @ViewChildren(UsergridComponent) child:QueryList<UsergridComponent>;
  currGrid:number = 0;
  isDataSet:boolean = false;
  gotDataFromAdmin:boolean = false; 

  constructor(public db:DatabaseService) {
    db.databaseSet.subscribe(value =>{
      this.isDataSet=value;
    })
    db.databaseChanges.subscribe(value =>{
    })
  }

  ngOnInit(): void {
  }

  addARow(){
    this.child.get(this.currGrid).addNewRowItem();
    this.db.databaseChanges.next(true);
  }

  tabChanged($event){
    this.currGrid = $event;
  }
  

}
