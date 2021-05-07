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
      console.log(params);
      var currColor = params.node.context.permColor;
      if (params.node.isSelected()) {
        params.node.context.permColor = params.context.colorChoice;
        console.log(params.context.permColor + " inside");
        return { background: params.node.context.permColor };
      }
        else if(params.node.context.permColor != undefined){
          params.node.context = {permColor:null};
          params.node.context.permColor = currColor;
        }
        else{
          console.log(params.node.context.permColor + " return");
          return { background: params.node.context.permColor };
        }
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
    this.gridApi = params.api; //gets gridApi here
    this.columnApi = params.columnApi; //gets columnApi here 
  }

  colorGrid(choice){
    this.gridOptions.context = {
      colorChoice:choice
    };
    console.log (this.gridApi.context);
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
