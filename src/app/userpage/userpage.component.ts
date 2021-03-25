import { DOCUMENT } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { CreateUserGridService } from 'app/create-user-grid.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements  OnInit {

  gotDataFromAdmin:boolean = false; 

  constructor(private gridService:CreateUserGridService) { }

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
