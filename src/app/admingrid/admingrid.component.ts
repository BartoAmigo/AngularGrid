import { Component, OnInit,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-admingrid',
  templateUrl: './admingrid.component.html',
  styleUrls: ['./admingrid.component.css']
})
export class AdmingridComponent implements OnInit {
  private gridApi;  //defines a placeholder for out gridApi
  private columnApi;  //defines placeholder for our columnApi 
  myRowData = []; // Defines row definitions
  myColumnDefs = [];  //defines column definitions 
  public excelData: [][]; //excel matrix use to store data informations. 

  /* Grid Options 
  used to set definitions for grid. can add Properties/events/callbacks
  */ 
  gridOptions = {
      //Properties 
      rowData:this.myRowData, //row data gets information from our array
      columnDefs:this.myColumnDefs, //grid gets column definitons here
      pagination:true
      //Events 
      //add event handlers
      /* */ 

      //callbacks
      /**/  
  };
  
  /* onGridReady 
  this function grabs our grid api.
  */
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
      this.updateCols();
    }
    updateCols()
    {
    
      for(var i = 0;i <this.excelData[0].length;i++)
      {
        this.myColumnDefs.push({field:this.excelData[0][i]});
      }
      this.gridApi.setColumnDefs(this.myColumnDefs);
    }
  }