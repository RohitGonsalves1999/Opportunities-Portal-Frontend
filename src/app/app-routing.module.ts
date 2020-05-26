import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { AddOpportunityComponent } from './opportunity/components/add-opportunity/add-opportunity.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: AddOpportunityComponent},
  {path: '**', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
