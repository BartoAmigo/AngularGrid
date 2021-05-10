import { Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CreateUserGridService {
  dataGotted = new BehaviorSubject<boolean>(false);
  dataGot:boolean=false;
  rowDefs = [];
  colDefs = [];
  constructor() { }

  setData(someRowDefs= [],someColDefs = []){
    this.dataGot = true; 
    this.rowDefs = someRowDefs;
    this.colDefs = someColDefs; 
  }
  getRowDefs(){
    return this.rowDefs; 
  }
  getColDefs(){
    return this.colDefs;
  }
  
}
