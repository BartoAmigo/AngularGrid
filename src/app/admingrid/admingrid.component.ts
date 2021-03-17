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
<<<<<<< Updated upstream
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
=======
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
>>>>>>> Stashed changes
    updateCols()
    {
    
      for(var i = 0;i <this.excelData[0].length;i++)
      {
        this.myColumnDefs.push({field:this.excelData[0][i]});
      }
      this.gridApi.setColumnDefs(this.myColumnDefs);

    }
<<<<<<< Updated upstream
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
=======
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

  
>>>>>>> Stashed changes
