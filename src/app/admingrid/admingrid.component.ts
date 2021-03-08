import { Component, OnInit,EventEmitter } from '@angular/core';

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
  public excelData: [][]
  
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
  
    //create html button to trigger function 
    receiveData($event){
      this.excelData = $event;
      console.log(this.excelData);
      
    }

  }