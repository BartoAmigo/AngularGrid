import { Component, OnInit } from '@angular/core';
import {CreateUserGridService} from 'services/create-user-grid.service'

@Component({
  selector: 'app-usergrid',
  templateUrl: './usergrid.component.html',
  styleUrls: ['./usergrid.component.css']
})
export class UsergridComponent implements OnInit {

  private gridApi; //placeholder for grid api 
  private columnApi; //place holder to get grid's column api
  private sideBar = "columns"; //this is for the side bar
  myRowData = [];  //array of row definitions 
  myColumnDefs=[];  //array of columndefinitions 
  
  /* Grid option function 
  Sets properties for grid 
  */ 
 private defColDefs = {
  flex: 1,
  minWidth: 100,
  enableValue: true,
  enableRowGroup: true,
  enablePivot: true,
  sortable: true,
  filter: true,
}


  gridOptions = {
    //properties 
    rowData:this.myRowData, //grabs our row definition 
    columnDefs:this.myColumnDefs, //grabs our column definition 
    pagination:true,
    defaultColDef:this.defColDefs,
    sideBar:this.sideBar,
    rowMultiSelectWithClick:"true"
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
    
    
    this.myRowData = this.gridService.getRowDefs(); //this gets the data from a service.
    this.myColumnDefs = this.gridService.getColDefs(); //this gets the data from a service.
    
    this.gridApi.setRowData(this.myRowData); //this sets row data.
    this.gridApi.setColumnDefs(this.myColumnDefs); //this sets column Data.
    
  }

  constructor(private gridService:CreateUserGridService) { 
    
  }
  ngOnInit(): void {
  }
}
