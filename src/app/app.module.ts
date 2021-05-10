import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AgGridModule} from 'ag-grid-angular'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { AdmingridComponent } from './admingrid/admingrid.component';
import { UsergridComponent } from './usergrid/usergrid.component';
import { ExcelsheetComponent } from './excelsheet/excelsheet.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { UserpageComponent } from './userpage/userpage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import { CustomTooltipComponent } from './custom-tooltip/custom-tooltip.component';

//import { GridcontrolboxComponent } from './gridcontrolbox/gridcontrolbox.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    AdmingridComponent,
    UsergridComponent,
    ExcelsheetComponent,
    AdminpageComponent,
    UserpageComponent,
    CustomTooltipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule.withComponents([CustomTooltipComponent]),
    BrowserAnimationsModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
