import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentlistComponent } from './studentlist/studentlist.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { AuthGuardService } from './auth.guard.service';



const routes: Routes = [
  
    // path:'main', component:HomeComponent,
    // canActivate:[AuthGuardService],
    // children:[
      
      {path:'dashboard', component:DashboardComponent,canActivate:[AuthGuardService]},
      {path:'studentlist', component:StudentlistComponent ,canActivate:[AuthGuardService]},
      {path:'update/:id', component:StudentDetailsComponent ,canActivate:[AuthGuardService]},
    // ]

  {path:'', component:RegisterComponent},

  // {path:'show', component:ShowDetailComponent},
  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent},
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
