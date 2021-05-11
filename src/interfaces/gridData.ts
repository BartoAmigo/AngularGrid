

interface IgridData{
    workSheetName:string;
    columns:any[];
    rows:any[];
    userEdited?:boolean;
    rowColors?:any[]
}

export class gridData implements IgridData{
    constructor(public workSheetName, public columns, public rows,public userEdited?,public rowColors?){
        this.userEdited = false;
        this.rowColors=[];
        
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
    getEditFlag():boolean{
        return this.userEdited;
    }
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