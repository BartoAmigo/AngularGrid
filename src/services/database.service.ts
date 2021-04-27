import { Injectable } from '@angular/core';
import {gridData} from '../interfaces/gridData';
import {BehaviorSubject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DatabaseService{
  database:gridData[]= [];

  databaseSet = new BehaviorSubject<boolean>(false);
  databaseChanges = new BehaviorSubject<boolean>(false);
  
  getDatabaseLength():number{
    return this.database.length;
  }
  getGridDataElement(a:number):gridData{
    return this.database[a];
  }
  getDatabase():gridData[]{
    return this.database;
  }
  updateElementRows(a:string,b:any[]){
    for(var i = 0; i<this.database.length;i++){
      if(this.database[i].getSheetName()==a){
        this.database[i].setNewRows(b);
      }
    }
  }
}