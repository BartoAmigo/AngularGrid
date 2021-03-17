import { Component, OnInit,EventEmitter } from '@angular/core';

import * as XLSX from 'xlsx';


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
  public excelSheet: XLSX.WorkSheet;
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
      this.excelSheet = $event;
      console.log(this.excelSheet)
      console.log("inside receiveData function")
    }
    receiveMatrixData($event){
      this.excelData= $event;
      console.log("inside receiveMatrixdata function");;
      this.updateCols();
      console.log("finished update columns function, going into populate data function")
      this.populateRows();

    }
   
    //update COLS just adds columns to grid. 
    updateCols()
    {
    
      for(var i = 0;i <this.excelData[0].length;i++)
      {
        this.myColumnDefs.push({field:this.excelData[0][i]});
      }
      this.gridApi.setColumnDefs(this.myColumnDefs);

    }
    setcolumns(columns)
    {
      var char = 'A';
      var num = 0;
      var col1 = 0;
      var col2 = 0;
      for(var i = 1;i <=this.myColumnDefs.length;i++)
      {
        //save first header
        columns[char] = this.myColumnDefs[i-1].field;
        //check if 'i' is longer than the alphabet
        if(i<26){
          num = char.charCodeAt(0); //Store char as number
          num++;
          char = String.fromCharCode(num); //Going from ascii to char
          console.log(char);
        }
        else
        {
          
          col1 = (i/26)+64;
          col2 = (i%26)+65;
          char = String.fromCharCode(col1)+String.fromCharCode(col2);
          console.log(char);
        }
      }

      return columns;
    }

    populateRows()
    {
      console.log("inside populate rows function")
      var columns = {};
      columns = this.setcolumns(columns);
      var rowData = [];
      var rowIndex = 2;
      while (this.excelSheet['A' + rowIndex]) {
        var row = {};
        Object.keys(columns).forEach(function(column) {
            row[columns[column]] = this.excelSheet[column + rowIndex].w;
        });

        rowData.push(row);

        rowIndex++;
    }

    // finally, set the imported rowData into the grid
    this.gridApi.setRowData(rowData);
}
           
         }

  
