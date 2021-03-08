import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdmingridComponent } from './admingrid/admingrid.component';
import { HomeComponent } from './home/home.component';
import { UsergridComponent } from './usergrid/usergrid.component';

const routes: Routes = [
  {path:'admingrid', component:AdmingridComponent},
  {path:'usergrid',component:UsergridComponent},
  {path:'Home',component:HomeComponent},
  {path:'About',component:AboutComponent},
  {path:'',redirectTo: '/Home',pathMatch:'full'},
  {path:'**',redirectTo:'/Home',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
