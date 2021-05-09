import { ElementSchemaRegistry, identifierModuleUrl } from '@angular/compiler';
import { parseI18nMeta } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, Input, OnInit } from '@angular/core';
import { RowNode } from 'ag-grid-community';
import {DatabaseService} from 'services/database.service'

@Component({
  selector: 'app-usergrid',
  templateUrl: './usergrid.component.html',
  styleUrls: ['./usergrid.component.css']
})
export class UsergridComponent implements OnInit {

  private gridApi; //placeholder for grid api 
  private columnApi; //place holder to get grid's column api
  private sideBar = "columns"; //this is for the side bar
  private rowIndex;
 // public getRowStyle;
  @Input() sheetName;
  @Input() myRowData; //array of row definitions 
  @Input() myColData; //array of columndefinitions 
  
  /* Grid option function 
  Sets properties for grid 
  */ 
  constructor(public db:DatabaseService){
    this.gridOptions.getRowStyle = (params) =>{
      for(var i =0;i<this.db.database[0].rowColors.length;i++){
        if(this.db.database[0].rowColors[i].rowIndex==params.node.rowIndex){
          return {background:this.db.database[0].rowColors[i].rowColors};
        }
      }
    }
  

  }
 private defColDefs = {
  flex: 1,
  minWidth: 100,
  enableValue: true,
  enableRowGroup: true,
  enablePivot: true,
  sortable: true,
  filter: true,
  editable:true
}



  gridOptions = {
    //properties 
    pagination:true,
    defaultColDef:this.defColDefs,
    sideBar:this.sideBar,
    //rowMultiSelectWithClick:"true",
    rowSelection:"multiple",
    getRowStyle:params =>{}
    
    //events
    //event handlers
    /*Insert Event handlers here  */

    //callbacks  
    /*Insert callbacks here */ 
    /**/

  }
/* Grid Ready function */
  onGridReady = (params) => {
    this.gridApi = params.api; //gets gridApi here
    this.columnApi = params.columnApi; //gets columnApi here 
  }


  addNewRowItem(){
    let columns = this.myColData;
    let row = {};
    Object.keys(columns).forEach(function(column){
      row[columns[column].field]="";
    });
    this.gridApi.applyTransaction({add:[row], addIndex: this.rowIndex+1 });
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

  ngOnInit(): void {
  }
}
