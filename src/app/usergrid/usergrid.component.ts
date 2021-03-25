import { Component, OnInit } from '@angular/core';
import {CreateUserGridService} from '../create-user-grid.service'

@Component({
  selector: 'app-usergrid',
  templateUrl: './usergrid.component.html',
  styleUrls: ['./usergrid.component.css']
})
export class UsergridComponent implements OnInit {

  private gridApi; //placeholder for grid api 
  private columnApi; //place holder to get grid's column api
  myRowData = [];  //array of row definitions 
  myColumnDefs=[];  //array of columndefinitions 
  
  /* Grid option function 
  Sets properties for grid 
  */ 

  gridOptions = {
    //properties 
    rowData:this.myRowData, //grabs our row definition 
    columnDefs:this.myColumnDefs, //grabs our column definition 
    pagination:true
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
    
    
    this.myRowData = this.gridService.getRowDefs();
    this.myColumnDefs = this.gridService.getColDefs();
    
    this.gridApi.setRowData(this.myRowData); 
    this.gridApi.setColumnDefs(this.myColumnDefs);
    
  }

  constructor(private gridService:CreateUserGridService) { 
    
  }
  ngOnInit(): void {
  }
}
