
import { Component, OnInit,Input} from '@angular/core';
import {CreateUserGridService} from '../create-user-grid.service'
import 'ag-grid-enterprise'

import * as XLSX from 'xlsx';


@Component({
  selector: 'app-admingrid',
  templateUrl: './admingrid.component.html',
  styleUrls: ['./admingrid.component.css']
})
export class AdmingridComponent implements OnInit {
  private gridApi;  //defines a placeholder for out gridApi
  private columnApi;  //defines placeholder for our columnApi 
  private sideBar = "columns";
  myRowData = []; // Defines row definitions
  myColumnDefs = [];  //defines column definitions 
  @Input() excelSheet: XLSX.WorkBook;
  @Input() excelData: [][]; //excel matrix use to store data informations. 
  public arrayData :any;
 
  private defColDefs = {
    flex: 1,
    minWidth: 100,
    enableValue: true,
    enableRowGroup: true,
    enablePivot: true,
    sortable: true,
    filter: true,
  }
  /* Grid Options 
  used to set definitions for grid. can add Properties/events/callbacks
  */ 
  gridOptions = {
      //Properties 
      rowData:this.myRowData, //row data gets information from our array
      defaultColDef:this.defColDefs,
      columnDefs:this.myColumnDefs, //grid gets column definitons here
      pagination:true,
      sideBar:this.sideBar,
      rowMultiSelectWithClick:"true"
      //Events 
      //add event handlers
      /* */ 

      //callbacks
      /**/  
  }
  /* onGridReady 
  this function grabs our grid api.
  */

  onGridReady = (params) => {
    this.gridApi = params.api; 
    this.columnApi = params.columnApi; 
    this.updateCols(); 
    this.populateRows(); 
  }
    constructor(private gridService:CreateUserGridService) { }
  
    ngOnInit(): void {
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
         
        }
        else
        {
          
          col1 = (i/26)+64;
          col2 = (i%26)+65;
          char = String.fromCharCode(col1)+String.fromCharCode(col2);
        }
      }
      return columns;
    }

    populateRows()
    {
  
      var firstSheetName = this.excelSheet.SheetNames[0];
    var worksheet = this.excelSheet.Sheets[firstSheetName];
      var columns = {};
      columns = this.setcolumns(columns);
      var rowIndex = 2;
      while (worksheet['A' + rowIndex]) {
        var row = {};
        Object.keys(columns).forEach(function(column) {
          if(worksheet[column+rowIndex]){
            row[columns[column]] = worksheet[column + rowIndex].w;
          }
        });

        this.myRowData.push(row);

        rowIndex++;
    }

    // finally, set the imported rowData into the grid'
    console.log(columns);
    console.log(this.myRowData[0].Make);
    this.gridApi.setRowData(this.myRowData);
}
  resetState(){
    this.columnApi.resetColumnState();
  }

  getColumnDefs():any{
    return this.myColumnDefs;
  }

  sendCurrentColumnState(){
    var someColDefs = [];
    let columns = this.columnApi.getAllDisplayedColumns();
    for(let i =0;i<columns.length;i++){
      var tempvar = columns[i].colId;
      someColDefs.push({field:tempvar.toString()})
      
    }
    this.gridService.setData(this.myRowData,someColDefs);
    this.gridService.dataGotted.next(true);

  }


}



