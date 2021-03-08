import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usergrid',
  templateUrl: './usergrid.component.html',
  styleUrls: ['./usergrid.component.css']
})
export class UsergridComponent implements OnInit {

  private gridApi; 
  private columnApi; 
  myRowData = []; 
  myColumnDefs=[]; 
  
  gridOptions = {
    rowData:this.myRowData,
    columnDefs:this.myColumnDefs,
    pagination:true
  }

  onGridReady = (params) => {
    this.gridApi = params.api; 
    this.columnApi = params.columnapi; 
  }

  constructor() { }

  ngOnInit(): void {
  }
}
