import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { HomeComponent } from './home/home.component';
import { UserpageComponent } from './userpage/userpage.component';

const routes: Routes = [
  {path:'adminpage', component:AdminpageComponent},
  {path:'userpage',component:UserpageComponent},
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
