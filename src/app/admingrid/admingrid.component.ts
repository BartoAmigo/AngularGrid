import { CustomTooltipComponent } from '../custom-tooltip/custom-tooltip.component';
import {DatabaseService} from 'services/database.service'
import { Component, OnInit,Input, ɵNG_INJ_DEF} from '@angular/core';
import {CreateUserGridService} from 'services/create-user-grid.service'
import {ColsFromExcelService} from 'services/cols-from-excel.service'
import {RowsFromExcelService} from 'services/rows-from-excel.service'
import 'ag-grid-enterprise'
import {ICellRendererParams} from 'ag-grid-community'
import { element } from 'protractor';


@Component({
  selector: 'app-admingrid',
  templateUrl: './admingrid.component.html',
  styleUrls: ['./admingrid.component.css']
})
export class AdmingridComponent implements OnInit {
  private gridApi;  //defines a placeholder for out gridApi
  private columnApi;  //defines placeholder for our columnApi 
  private sideBar = "columns"; //columns for side
  @Input() columnInfo; // columnInfo is going to collect column   
  @Input() myRowData; // Defines row definitions
  @Input() sheetName:string; //sheetName
  public tooltipShowDelay;
  public frameworkComponents;


  ngOnInit(){

  }
  constructor(private gridService:CreateUserGridService, private getColFromExcelService:ColsFromExcelService, private RowService:RowsFromExcelService, private db:DatabaseService)  {
     
    this.frameworkComponents = { customTooltip: CustomTooltipComponent };
   }

private deleteIndex;
private rowIndex;
 newbranch
  //This is for the column information, sets rules to every column. 
  private defColDefs = {
    flex: 1,
    minWidth: 200,
    enableValue: true,
    enableRowGroup: true,
    enablePivot: true,
    sortable: true,
    filter: true,
    editable:true,
    tooltipComponent: 'customTooltip',

  }



  /* Grid Options 
  used to set definitions for grid. can add Properties/events/callbacks
  */ 
  gridOptions = {
      //Properties 
      //row data gets information from our array
      defaultColDef:this.defColDefs,
       //grid gets column definitons here
      pagination:true, //pagination
      sideBar:this.sideBar, //sidebar
      //rowMultiSelectWithClick:"true", //rowMultiSelectWithClick
      rowSelection:"multiple",
      detailCellRendererFramework: CustomTooltipComponent,
      detailCellRendererParams: (params: ICellRendererParams) => this.formatToolTip(params.data),
      getRowStyle: params => { 
        if (params.node.isSelected()) {
          if (params.context.colorChoice === "clearRow") {
            params.node.permColor = undefined;
          }
          else {
            params.node.permColor = params.context.colorChoice;
          }
          return { background: params.node.permColor };
        }
        else if (params.context.colorChoice === "clearAll") {
          params.node.permColor = undefined;
        }
        return { background: params.node.permColor };
       },
      context: {
        colorChoice: '#f25d5a',
      }

      //Events 
      //add event handlers
      /* */ 

      //callbacks
      /**/  
  }


  /*OnGridReady function just loads the grid up
  in this function you are able to get the gridapi and column api. */ 




  onGridReady = (params) => {
    this.gridApi = params.api; 
    this.columnApi = params.columnApi;
    }

  //resetState function resets columns to the original content
  resetState(){
    this.columnApi.resetColumnState(); //resets columns to origin state 
  }


  addNewRowItem(){
    let columns = this.columnInfo;
    let row = {};
  
    Object.keys(columns).forEach(function(column){
      row[columns[column].field]="";
    });
    this.gridApi.applyTransaction({ add: [row], addIndex: this.rowIndex+1 })
    this.updateRowItems();
  }

  onRowClick(event: any): void {
    this.deleteIndex = event.getRow;
    this.rowIndex = event.rowIndex
  }

  colorGrid(choice,currentGrid){
    this.gridOptions.context = {
      colorChoice:choice
    };
    this.gridApi.redrawRows();
      this.gridApi.forEachNode(element => {
        if(element.permColor){
          var colorObj = {rowIndex: element.rowIndex, rowColors:element.permColor}
          this.db.database[currentGrid].rowColors.push(colorObj);
        }
        console.log(this.db.database[currentGrid].rowColors);
    }); 
    
  }

  deleteRowItem(){
    var selectedData = this.gridApi.getSelectedRows();
    var res = this.gridApi.applyTransaction({ remove: selectedData });
    this.updateRowItems();
  }


  updateRowItems(){
    let exrowdata = [];
    this.gridApi.forEachNode(function(node){
      exrowdata.push(node.data);
    });
    this.myRowData = exrowdata;
    this.db.updateElementRows(this.sheetName,exrowdata); 
  }



  formatToolTip(params: any) {
    // USE THIS FOR TOOLTIP LINE BREAKs

    const toolTipArray = this.gridApi.setColumnDefs(this.columnInfo);
    const toolTipArray1 = this.gridApi.setColumnDefs(this.columnInfo);

    return {toolTipArray,toolTipArray1}

    // USE THIS FOR SINGLE LINE TOOLTIP

    // const lineBreak = false;
    // const toolTipString = 'Hello World'
    // return { toolTipString, lineBreak }
  }

    

  
}



