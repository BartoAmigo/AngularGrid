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
  public arrayData :any;
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
      this.updateCols();
      
      //this.updateRows();
    }
    receiveRowData($event){
     console.log("receive row data function");
      this.arrayData = $event;
      console.log(this.arrayData);
      this.gridApi.setRowData(this.arrayData);
    }
    updateCols()
    {
    
      for(var i = 0;i <this.excelData[0].length;i++)
      {
        this.myColumnDefs.push({field:this.excelData[0][i]});
      }
      this.gridApi.setColumnDefs(this.myColumnDefs);
    }
    // i = rows, x = columns
    //this.exceldata.length = amount of rows/number of arrays
   // this.exceldata[i].length = number of columns/length of array
    updateRows(){
      
      
      //first for loop deals with number of rows
      //second for loop deals with number of columns
       /*for(var i = 1;i < this.excelData.length; i++){
          this.myRowData.push({field:this.excelData[i]});
         */
        

         //this.myRowData = this.excelData[i];
         //console.log(this.excelData[i]);
        // this.gridApi.setRowData(tempArray);

       }
       
    }

  
 /**  for(var x = 0; x  <this.excelData[i].length;x++){
    this.myRowData.push({field:this.excelData[i][x]});
   }
   */