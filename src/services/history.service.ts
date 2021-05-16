import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  messages:string[] =[];
  constructor() { 
  }
  clearMessages(){
    this.messages = [];
  }
  addMessage(choice:number,position:string,worksheet:string,row:number){
    switch(choice)
    {
      case 1:
        if(row!=undefined){
        let message = `${position} added row ${row} on ${worksheet}` 
        this.messages.push(message);
        break;
        }
        else{
          let message = `${position} added row on ${worksheet}`;
          this.messages.push(message);
          break;
        }
      case 2:
        if(row!=undefined){
        let message = `${position} deleted row ${row} on ${worksheet}`
        this.messages.push(message);
        break;
        }
        else{
          let message = `${position} tried deleting a row on ${worksheet}`
          this.messages.push(message);
        }
    }
    

  }
}
