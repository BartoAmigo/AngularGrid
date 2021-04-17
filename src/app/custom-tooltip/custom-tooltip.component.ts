import { element } from 'protractor';
import { AdmingridComponent } from './../admingrid/admingrid.component';
import { TooltipComponent } from 'ag-grid-community/dist/lib/components/framework/componentTypes';
import { Component, OnInit, } from '@angular/core';
import { ITooltipAngularComp } from 'ag-grid-angular';
import { ITooltipParams, IAfterGuiAttachedParams } from 'ag-grid-community';
import { ICellRendererParams } from 'ag-grid-community';
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
//public keyArray = [];
  constructor() { }
  agInit(params: ITooltipParams): void {
    this.params = params;
    this.data = params.api.getDisplayedRowAtIndex(params.rowIndex).data;
    var value,key;
    Object.keys(this.data).forEach(element => {
      if(this.data[element] === null){
        value = "data missing";
        key = element;
      }
      else{
        value = this.data[element];
        key = element;
      }
      this.dataArray.push(key + " : " + value);
    });
    console.log(this.dataArray);
  }

  refresh(params: ITooltipParams): boolean {
    this.params = params;
    return true;
  }


  ngOnInit(): void {
  }

}


