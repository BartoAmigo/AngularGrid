import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {

  gotDataFromAdmin:boolean = false; 
  
  constructor() { }

  ngOnInit(): void {
  }
  fillUserGrid(){
    this.gotDataFromAdmin=true;
  }
}
