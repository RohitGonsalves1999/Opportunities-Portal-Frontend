import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { AddOpportunityComponent } from './opportunity/components/add-opportunity/add-opportunity.component';
import { ViewOpportunityComponent } from './opportunity/components/viewopportunities/view-opportunity/view-opportunity.component';
import { SideNavBarComponent } from './side-nav/components/side-nav/side-nav-bar/side-nav-bar.component';
import { ViewTrendsComponent } from './opportunity/components/view-trends/view-trends/view-trends.component';
import { EditOpportunityComponent } from './opportunity/components/edit-opportunity/edit-opportunity/edit-opportunity.component';
import { AuthGuardService as AuthGuard } from '../app/auth/providers/auth-guard/auth-guard.service';
import { ErrorHandlingComponent } from './error/components/error-handling/error-handling.component';
import { ViewOpportunityVersionsComponent } from './opportunity/components/view-versions/view-opportunity-versions/view-opportunity-versions.component';

const routes: Routes = [
  {
    path: 'edit/:id',
    component: EditOpportunityComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'versions/:id',
    component: ViewOpportunityVersionsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'insights',
    component: ViewTrendsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sidenav',
    component: SideNavBarComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: AddOpportunityComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'all',
    component: ViewOpportunityComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', component: ErrorHandlingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
