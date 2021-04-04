
import { Component, OnInit,Input} from '@angular/core';
import {CreateUserGridService} from 'services/create-user-grid.service'
import {ColsFromExcelService} from 'services/cols-from-excel.service'
import {RowsFromExcelService} from 'services/rows-from-excel.service'
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
  private sideBar = "columns"; //columns for side
  columnInfo; // columnInfo is going to collect column   
  myRowData = []; // Defines row definitions
  myColumnDefs = [];  //defines column definitions 
  @Input() excelSheet: XLSX.WorkBook; //excelSheet 
  @Input() excelData: [][]; //excel matrix use to store data informations. 
 


  //This is for the column information, sets rules to every column. 
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
      pagination:true, //pagination
      sideBar:this.sideBar, //sidebar
      rowMultiSelectWithClick:"true" //rowMultiSelectWithClick

      //Events 
      //add event handlers
      /* */ 

      //callbacks
      /**/  
  }
  /* onGridReady 
  this function grabs our grid api.
  */


  /*OnGridReady function just loads the grid up
  in this function you are able to get the gridapi and column api. */ 

  onGridReady = (params) => {
    this.gridApi = params.api; 
    this.columnApi = params.columnApi; 
    this.updateCols(); 
    this.populateRows(); 
  }

  //in the constructor we are injecting a grid service in our constructor. 
    constructor(private gridService:CreateUserGridService, private getColFromExcelService:ColsFromExcelService, private RowService:RowsFromExcelService)  { }
  
    ngOnInit(): void {
    }
  
   
    //update COLS just adds columns to grid. 
    updateCols()
    {
      this.columnInfo = this.getColFromExcelService.getColumnsFromExcelFile(this.excelData);
      this.myColumnDefs = this.columnInfo.columns;
      this.gridApi.setColumnDefs(this.myColumnDefs);
    }

    /*SetColumns Function 
    creates columns for the populate rows */
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


    /*
    This function populateRows() 
    creates rowdata using an excelfile. 
    */
    populateRows()
    {
    let firstSheetName = this.excelSheet.SheetNames[0]; 
    let worksheet = this.excelSheet.Sheets[firstSheetName];
    /*
      let columns = {};
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
    */

    // finally, set the imported rowData into the grid
    this.myRowData = this.RowService.populateRows(worksheet,this.columnInfo.columnsForRows);
    // SetRowData
    this.gridApi.setRowData(this.myRowData);
}

  //resetState function resets columns to the original content
  resetState(){
    this.columnApi.resetColumnState(); //resets columns to origin state 
  }

  /* 
  getColumnDefs() 
  just grabs columnDefs
  */
  getColumnDefs():any{
    return this.myColumnDefs;
  }


  /*sendCurrentColumnState function 
  sends data to the userGrid. 
  */ 
  sendCurrentColumnState(){
    let someColDefs = [];  
    let columns = this.columnApi.getAllDisplayedColumns(); 
    for(let i =0;i<columns.length;i++){
      var tempvar = columns[i].colId;
      someColDefs.push({field:tempvar.toString()})
    }
    this.gridService.setData(this.myRowData,someColDefs);
    this.gridService.dataGotted.next(true);

  }


}



