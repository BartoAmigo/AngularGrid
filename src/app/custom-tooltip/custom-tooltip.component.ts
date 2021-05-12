
import { Component, OnInit, } from '@angular/core';
import { ITooltipAngularComp } from 'ag-grid-angular';
import { ITooltipParams} from 'ag-grid-community';

@Component({
  selector: 'app-custom-tooltip',
  templateUrl: './custom-tooltip.component.html',
  styleUrls: ['./custom-tooltip.component.css']
})
export class CustomTooltipComponent implements ITooltipAngularComp,OnInit {

 public params: ITooltipParams;
  public data: any;
  public toolTip: string;
  public dataArray  = [];
public keyArray = [];
  constructor() { }
  /* 
  agInit grabs the data from the admingrid component for the tooltip parameters
  */
  agInit(params: ITooltipParams): void {
    this.params = params;
    //grabs the index the mouse is hovering over
    this.data = params.api.getDisplayedRowAtIndex(params.rowIndex).data;
    var value,key;
    //loops through row data on hovered row, excludes any data that has not been inputted (empty cells)
    Object.keys(this.data).forEach(element => {
      if(this.data[element] === undefined){
        value = "data missing";
        key = element;
      }
      else{
        value = this.data[element];
        key = element;
      }
      //places the key and value for each row cell into an array
      this.dataArray.push(key + " : " + value);
    });
  }

  refresh(params: ITooltipParams): boolean {
    this.params = params;
    return true;
  }


  ngOnInit(): void {
  }

}


