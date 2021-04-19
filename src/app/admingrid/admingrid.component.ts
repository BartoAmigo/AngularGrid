import { CustomTooltipComponent } from './../custom-tooltip/custom-tooltip.component';

import { Component, OnInit,Input} from '@angular/core';
import {CreateUserGridService} from 'services/create-user-grid.service'
import {ColsFromExcelService} from 'services/cols-from-excel.service'
import {RowsFromExcelService} from 'services/rows-from-excel.service'
import 'ag-grid-enterprise'
import{ICellRendererParams} from 'ag-grid-community'
import * as XLSX from 'xlsx';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-admingrid',
  templateUrl: './admingrid.component.html',
  styleUrls: ['./admingrid.component.css']
})
export class AdmingridComponent implements OnInit {
  private gridApi;  //defines a placeholder for out gridApi
  private columnApi;  //defines placeholder for our columnApi 
  private sideBar = "columns"; //columns for side
  columnInfo; // columnInfo is going to collect column   
  myRowData = []; // Defines row definitions
  myColumnDefs = [];  //defines column definitions 
  @Input() excelSheet: XLSX.WorkBook; //excelSheet 
  @Input() excelData: [][];
  @Input() index: Number //index of worksheet
  public tooltipShowDelay;
  public frameworkComponents;
private deleteIndex;
private rowIndex;
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
      rowData:this.myRowData, //row data gets information from our array
      defaultColDef:this.defColDefs,
      columnDefs:this.myColumnDefs, //grid gets column definitons here
      pagination:true, //pagination
      sideBar:this.sideBar, //sidebar
      rowMultiSelectWithClick:"true", //rowMultiSelectWithClick
      rowSelection:"single",
      detailCellRendererFramework: CustomTooltipComponent,
      detailCellRendererParams: (params: ICellRendererParams) => this.formatToolTip(params.data),
      getRowStyle: params => {

        if( params.node.rowIndex % 14 === 0){
          return {background: '#f25d5a'};
        }
        else if(params.node.rowIndex % 14 === 1){
          return {background: '#363537',color:'white'};
        }
        else if(params.node.rowIndex % 14 === 2){
            return {background: '#84be18'};
        }
        else if(params.node.rowIndex % 14 === 3){
          return {background: 'a68e5a'};

        }
        else if(params.node.rowIndex % 14 === 4){
          return {background: '#dddcce'};
        }
        else if(params.node.rowIndex % 14 === 5){
          return {background: '#84a834'};
        }
        else if(params.node.rowIndex % 14 === 6){
          return {background: '#1698d4'};
        }
        else if(params.node.rowIndex % 14 === 7){
          return {background: '#4e6585'};
        }
        else if(params.node.rowIndex % 14 === 8){
          return {background: '#3d3c3e'};
        }
        else if(params.node.rowIndex % 14 === 9){
          return {background: '#e74701'};
        }
        else if(params.node.rowIndex % 14 === 10){
          return {background: '#bfef75'};
        }
        else if(params.node.rowIndex % 14 === 11){
          return {background: '#0fc8f8'};
        }
        else if(params.node.rowIndex % 14 === 12){
          return {background: '#807e80'};
        }
        else if(params.node.rowIndex % 14 === 13){
          return {background: '#f25b48'};
        }
        else if(params.node.rowIndex % 14 === 14){
          return {background: '#ee1c25'};



        }



      },
      //Events 
      //add event handlers
      /* */ 

      //callbacks
      /**/  
  }
  /* onGridReady 
  this function grabs our grid api.
  */


  /*OnGridReady function just loads the grid up
  in this function you are able to get the gridapi and column api. */ 




  onGridReady = (params) => {
    this.gridApi = params.api; 
    this.columnApi = params.columnApi;
    this.updateCols(this.index)
    this.populateRows(this.index)
    
    }
  

  //in the constructor we are injecting a grid service in our constructor. 
    constructor(private gridService:CreateUserGridService, private getColFromExcelService:ColsFromExcelService, private RowService:RowsFromExcelService)  {
     
      this.frameworkComponents = { customTooltip: CustomTooltipComponent };
     }
  
    ngOnInit(): void {
    }
  
   
    //update COLS just adds columns to grid. 
    updateCols(newindex)
    {
      let firstSheetName = this.excelSheet.SheetNames[newindex]; 
      let worksheet = this.excelSheet.Sheets[firstSheetName];
      this.columnInfo = this.getColFromExcelService.getColumnsFromExcelFile(worksheet);
      this.myColumnDefs = this.columnInfo.columns;
      this.gridApi.setColumnDefs(this.myColumnDefs);
    }



    /*
    This function populateRows() 
    creates rowdata using an excelfile. 
    */
    populateRows(newindex)
    {

    let firstSheetName = this.excelSheet.SheetNames[newindex]; 
    let worksheet = this.excelSheet.Sheets[firstSheetName];
    
  
    // finally, set the imported rowData into the grid
    this.myRowData = this.RowService.populateRows(worksheet,this.columnInfo.columnsForRows);
    // SetRowData
    this.gridApi.setRowData(this.myRowData);
}

  //resetState function resets columns to the original content
  resetState(){
    this.columnApi.resetColumnState(); //resets columns to origin state 
  }

  /* 
  getColumnDefs() 
  just grabs columnDefs
  */
  getColumnDefs():any{
    return this.myColumnDefs;
  }


  /*sendCurrentColumnState function 
  sends data to the userGrid. 
  */ 
  sendCurrentColumnState(){
    let someColDefs = [];  
    let columns = this.columnApi.getAllDisplayedColumns(); 
    for(let i =0;i<columns.length;i++){
      var tempvar = columns[i].colId;
      someColDefs.push({field:tempvar.toString()})
    }
    this.gridService.setData(this.myRowData,someColDefs);
    this.gridService.dataGotted.next(true);

  }

  addNewRowItem(){
    let columns = this.columnInfo.columnsForRows;
    let row = {};
  
    Object.keys(columns).forEach(function(column){
      row[columns[column]] = ""; 
    });

    this.gridApi.applyTransaction({ add: [{row}], addIndex: this.rowIndex+1 })

    //this.gridApi.applyTransaction({add:[row]})

  }
  onRowClick(event: any): void {
    this.deleteIndex = event.getRow;
    this.rowIndex = event.rowIndex

  }
  deleteRowItem(){
    var selectedData = this.gridApi.getSelectedRows();
    var res = this.gridApi.applyTransaction({ remove: selectedData });

  }

  formatToolTip(params: any) {
    // USE THIS FOR TOOLTIP LINE BREAKs

    const toolTipArray = this.gridApi.setColumnDefs(this.myColumnDefs);
    const toolTipArray1 = this.gridApi.setColumnDefs(this.myColumnDefs);

    return {toolTipArray,toolTipArray1}

    // USE THIS FOR SINGLE LINE TOOLTIP

    // const lineBreak = false;
    // const toolTipString = 'Hello World'
    // return { toolTipString, lineBreak }
  }

    

  
}



