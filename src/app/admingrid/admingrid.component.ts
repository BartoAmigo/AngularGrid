import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admingrid',
  templateUrl: './admingrid.component.html',
  styleUrls: ['./admingrid.component.css']
})
export class AdmingridComponent implements OnInit {
  private gridApi; 
  private columnApi; 
  myRowData = []; 
  myColumnDefs = []; 
  
  gridOptions = {
      rowData:this.myRowData,
      columnDefs:this.myColumnDefs,
      pagination:true
  };
  
  onGridReady = (params) => {
    this.gridApi = params.api; 
    this.columnApi = params.columnapi; 
  }
    constructor() { }
  
    ngOnInit(): void {
    }
  
  }