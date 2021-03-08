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

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    AdmingridComponent,
    UsergridComponent,
    ExcelsheetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
