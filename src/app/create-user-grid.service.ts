import { Injectable} from '@angular/core';
import {Subject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CreateUserGridService {
  dataGot:boolean = false;
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
