import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ViewEventsComponent } from './view-events/view-events.component';

const routes: Routes = [
  {
    path:"register",component:RegisterComponent
 },{
   path:"",component:LoginComponent
 },{
   path:"dashBoard",component:DashBoardComponent
 },{
   path:"viewEvents",component:ViewEventsComponent
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
