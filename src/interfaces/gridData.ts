/*Interface IgridData*/
/*Will set the template up for our gridData element.*/
interface IgridData{
    workSheetName:string; //workSheetName 
    columns:any[]; //column object 
    rows:any[]; //row object 
    //userEdited?:boolean; 
    rowColors?:any[] //objects to hold rowindex, rowcolor to keep track of rows that are colored.
}
/*gridData class: for Database see Database.service.ts */
export class gridData implements IgridData{
    constructor(public workSheetName, public columns, public rows,public rowColors?){
        //this.userEdited = false;
        this.rowColors=[]; //by default set rowColors to nothing.
        
    }
    getSheetName():string{
        return this.workSheetName;
    }
    getRows():any[]{
        return this.rows;
    }
    getColumns():any[]{
        return this.columns;
    }
    /*getEditFlag():boolean{
        return this.userEdited;
    }
    */
    setNewColumns(a:any[]){
        this.columns = a;
    }
    setNewRows(a:any[]){
        this.rows = a; 
    }
    setARowColor(a:number,b:string){
      let obj = {};
      obj = {rowIndex:a,rowColor:b};
      this.rowColors.push(obj);
    }
}