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
  public selectedNodes=[];
 // public getRowStyle;
  @Input() sheetName;
  @Input() myRowData; //array of row definitions 
  @Input() myColData; //array of columndefinitions 
  
  /* Grid option function 
  Sets properties for grid 
  */ 
  constructor(public db:DatabaseService){ 
    /*this.getRowStyle = function (params) {
      setTimeout(() => {
        console.log(params.node.rowIndex === this.selectedNodes[0].rowIndex)
        if (params.node.rowIndex === this.selectedNodes.rowIndex) {
          return { background: 'blue' };
      }
      },0);
        
    };*/
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
    getRowStyle: params => { 
      if (params.node.isSelected()) {
        if (params.context.colorChoice === "clearRow") {
          params.node.permColor = undefined;
        }
        else {
          params.node.permColor = params.context.colorChoice;

        }
        this.db.getGridDataElementByName(this.sheetName).setARowColor(params.node.rowIndex,params.node.permColor);
        console.log(this.db.database[0].rowColors[0]);
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
    
    //events
    //event handlers
    /*Insert Event handlers here  */

    //callbacks  
    /*Insert callbacks here */ 
    /**/

  }
/* Grid Ready function */
  onGridReady = (params) => {
    console.log(params);
    this.gridApi = params.api; //gets gridApi here
    this.columnApi = params.columnApi; //gets columnApi here 
  }

  colorGrid(choice){
    this.gridOptions.context = {
      colorChoice:choice
    };

    this.gridApi.redrawRows();  
  }

  addNewRowItem(){
    let columns = this.myColData;
    let row = {};
    Object.keys(columns).forEach(function(column){
      row[columns[column].field]="";
    });
    this.gridApi.applyTransaction({add:[row]});
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
