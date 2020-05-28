import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { AddOpportunityComponent } from './opportunity/components/add-opportunity/add-opportunity.component';
import { ViewOpportunityComponent } from './opportunity/components/viewopportunities/view-opportunity/view-opportunity.component';
import { SideNavBarComponent } from './side-nav/components/side-nav/side-nav-bar/side-nav-bar.component';


const routes: Routes = [
  {path: 'sidenav', component: SideNavBarComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: AddOpportunityComponent},
  {path: 'all', component: ViewOpportunityComponent},
  {path: '**', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
