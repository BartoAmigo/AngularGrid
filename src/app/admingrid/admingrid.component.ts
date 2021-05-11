import { CustomTooltipComponent } from '../custom-tooltip/custom-tooltip.component';
import {DatabaseService} from 'services/database.service'
import { Component, OnInit,Input} from '@angular/core';
import 'ag-grid-enterprise'
import {ICellRendererParams} from 'ag-grid-community';


@Component({
  selector: 'app-admingrid',
  templateUrl: './admingrid.component.html',
  styleUrls: ['./admingrid.component.css']
})
export class AdmingridComponent implements OnInit{
  private gridApi;  //defines a placeholder for out gridApi
  private columnApi;  //defines placeholder for our columnApi 
  private sideBar = "columns"; //columns for side
  @Input() columnInfo; // columnInfo is going to collect column   
  @Input() myRowData; // Defines row definitions
  @Input() sheetName:string; //sheetName
  @Input() currGrid; //current grid index.
  public tooltipShowDelay; //DAVE & JESSE
  public frameworkComponents; //DAVE & JESSE 


  ngOnInit(){
    console.log("grid is not ready");
  }
  constructor(private db:DatabaseService)  {
     
    this.frameworkComponents = { customTooltip: CustomTooltipComponent }; //DAVE & JESSE 
   }

private deleteIndex; //place holder for a row you are about to delete 
private rowIndex; //place holder for a row index you are about to add. 
  
/*THIS CODE IS REQUIRED TO RUN AN AG-GRID COMPONENT */ 

//This is for the column information, sets default rules to every column.
  private defColDefs = {
    flex: 1,
    minWidth: 200,
    enableValue: true,
    enableRowGroup: true,
    enablePivot: true,
    sortable: true,
    filter: true,
    editable:true,
    tooltipComponent: 'customTooltip',

  }



  /* Grid Options 
  used to set definitions for grid. can add Properties/events/callbacks
  */ 
  gridOptions = {
      //Properties 
      //row data gets information from our array
      defaultColDef:this.defColDefs,
       //grid gets column definitons here
      pagination:true, //pagination
      sideBar:this.sideBar, //sidebar
      //rowMultiSelectWithClick:"true", //rowMultiSelectWithClick
      rowSelection:"multiple", //allows us to select mulitple rows.
      detailCellRendererFramework: CustomTooltipComponent,
      detailCellRendererParams: (params: ICellRendererParams) => this.formatToolTip(params.data),
      getRowStyle: params => { 
        //return //{background:params.node.permColor}
        if (params.node.isSelected()) {
          if (params.context.colorChoice === "clearRow") {
            params.node.permColor = undefined;
          }
          else {
            params.node.permColor = params.context.colorChoice;
          }
          console.log(params);
          return { background: params.node.permColor };
        }
        else if (params.context.colorChoice === "clearAll") {
          params.node.permColor = undefined;
        }
        return { background: params.node.permColor };
       },
      context: {
        colorChoice: '#f25d5a',
      }
      
      //Events 
      //add event handlers
      /* */ 

      //callbacks
      /**/
  }


  /*OnGridReady function just loads the grid up
  in this function you are able to get the gridapi and column api. */ 
  onGridReady = (params) => {
    this.gridApi = params.api; 
    this.columnApi = params.columnApi;
    console.log("grid is ready");
    }


/*END OF REQUIRED CODE TO RUN GRID COMPONENT */ 




  //resetState function resets columns to the original content
  resetState(){
    this.columnApi.resetColumnState(); //resets columns to origin state 
  }


  addNewRowItem(){
    let columns = this.columnInfo;
    let row = {};
  
    Object.keys(columns).forEach(function(column){
      row[columns[column].field]="";
    });
    this.gridApi.applyTransaction({ add: [row], addIndex: this.rowIndex+1 })
    this.updateRowItems();
  }
/*onRowClick function: reciever for an output() when a row has been clicked. Sets row position for delete/add */
  onRowClick(event: any): void {
    this.deleteIndex = event.getRow;
    this.rowIndex = event.rowIndex
  }

  /* WAIT */
  colorGrid(choice,currentGrid){
    var wasFound:boolean = false; 
    this.gridOptions.context = {
      colorChoice:choice
    };
    this.gridApi.redrawRows();
      this.gridApi.forEachNode(element => {
        if(element.permColor){
          var colorObj = {rowIndex: element.rowIndex, rowColors:element.permColor}
          for(var i = 0;i<this.db.database[currentGrid].rowColors.length;i++){
            if(this.db.database[currentGrid].rowColors[i].rowIndex == colorObj.rowIndex)
            {
              this.db.database[currentGrid].rowColors[i].rowColors=colorObj.rowColors;
              wasFound=true;
            }
          }
          if(wasFound==false){
            this.db.database[currentGrid].rowColors.push(colorObj);
          }
        }
    }); 
    
  }

  deleteRowItem(){
    var selectedData = this.gridApi.getSelectedRows();
    var res = this.gridApi.applyTransaction({ remove: selectedData });
    this.updateRowItems();
  }


  updateRowItems(){
    let exrowdata = [];
    this.gridApi.forEachNode(function(node){
      exrowdata.push(node.data);
    });
    this.myRowData = exrowdata;
    this.db.updateElementRows(this.sheetName,exrowdata); 
  }



  formatToolTip(params: any) {
    // USE THIS FOR TOOLTIP LINE BREAKs

    const toolTipArray = this.gridApi.setColumnDefs(this.columnInfo);
    const toolTipArray1 = this.gridApi.setColumnDefs(this.columnInfo);

    return {toolTipArray,toolTipArray1}

    // USE THIS FOR SINGLE LINE TOOLTIP

    // const lineBreak = false;
    // const toolTipString = 'Hello World'
    // return { toolTipString, lineBreak }
  }

    

  
}



