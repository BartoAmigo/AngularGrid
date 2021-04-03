
import { Component, OnInit} from '@angular/core';
import { CreateUserGridService } from 'services/create-user-grid.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements  OnInit {
  somebool:boolean; 
  gotDataFromAdmin:boolean = false; 

  constructor(private gridService:CreateUserGridService) {
    this.gridService.dataGotted.subscribe((res: boolean) =>{
    console.log(this.somebool = res);
    })
   }

  ngOnInit(): void {

  }
  fillUserGrid(){
    if(this.gridService.dataGot==true)
    this.gotDataFromAdmin=true;
    else
    {
      alert("No Data is Available");
    }
  }
}
