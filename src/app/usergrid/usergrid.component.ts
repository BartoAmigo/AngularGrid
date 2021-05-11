
import { Component, Input, OnInit} from '@angular/core';
import {DatabaseService} from 'services/database.service'

@Component({
  selector: 'app-usergrid',
  templateUrl: './usergrid.component.html',
  styleUrls: ['./usergrid.component.css']
})
export class UsergridComponent implements OnInit{

  private gridApi; //placeholder for grid api 
  private columnApi; //place holder to get grid's column api
  private sideBar = "columns"; //this is for the side bar
  private rowIndex;
  tempColor;
 // public getRowStyle;
  @Input() sheetName;
  @Input() myRowData; //array of row definitions 
  @Input() myColData; //array of columndefinitions 
  @Input() currGrid;
  
  /* Grid option function 
  Sets properties for grid 
  */ 
  constructor(public db:DatabaseService){
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
    getRowStyle:params =>{
      return {background:params.node.permColor}
    },
    
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
  progressColor(){
    let rowColors = this.db.database[this.currGrid].rowColors;
    var rows=[];
    for(var i =0;i<rowColors.length;i++){
      var row=this.gridApi.getRowNode(rowColors[i].rowIndex);
      row.permColor=rowColors[i].rowColors;
      rows.push(row);
    }
    this.gridApi.redrawRows({rowNodes:rows});
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
//updates row nodes and inputs the updated nodes into the "database" for the currently viewed worksheet
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
