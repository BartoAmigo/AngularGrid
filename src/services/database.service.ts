import { Injectable } from '@angular/core';
import {gridData} from '../interfaces/gridData';
import {BehaviorSubject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})

/*
DatabaseService Function: This holds our database. Where we grab all the data from in our components. 
*/
export class DatabaseService{
  /*See interfaces/gridData.ts*/
  /*Creating an array of gridData elements*/
  database:gridData[]= [];
  /*currWorkSheet is just a subject. We use this subject to keep track of our current gridData element. SEE MAT TAB ON ADMINPAGE OR USERPAGE*/
  currWorkSheet = new BehaviorSubject<string>("");

  /*databaseSet is just a subject. We use this subject to keep track if we have entered any data in our fake database.*/
  databaseSet = new BehaviorSubject<boolean>(false);
  /*databaseChanges is just a subject. We use this subject to see if we have any changes in the database.*/
  databaseChanges = new BehaviorSubject<boolean>(false);

  /*getDatabaseLength function: returns the length of the database array*/
  getDatabaseLength():number{
    return this.database.length;
  }
  /*getGridDataElement function: returns a specific database element
  PARAMETERS: a = a index you would like*/
  getGridDataElement(a:number):gridData{
    return this.database[a];
  }
  
  /*getGridDataElementByName function: returns a specific database element by name
  PARAMETERS: a = a worksheet you are looking for*/
  getGridDataElementByName(a:string):gridData{
    for(var i = 0; i<this.database.length;i++){
      if(this.database[i].getSheetName()==a)
      return this.database[i];
    }
  }

  /*getDatabase function: returns the whole database*/
  getDatabase():gridData[]{
    return this.database;
  }

  /*
  updateElementRows function: is called when a user/admin adds a row. this updates the rows in the database.
  PARAMETERS: a: worksheetName, b: new row array 
  */
  updateElementRows(a:string,b:any[]){
    for(var i = 0; i<this.database.length;i++){
      if(this.database[i].getSheetName()==a){
        this.database[i].setNewRows(b);
      }
    }
  }
}