import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { GoogleLoginProvider, AuthService } from 'angularx-social-login';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { socialConfigs } from '../app/utils/socialConfigs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import { MatTableModule } from '@angular/material/table'  
import { ChartsModule } from 'ng2-charts';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatMenuModule} from '@angular/material/menu';
import { AddOpportunityComponent } from './opportunity/components/add-opportunity/add-opportunity.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewOpportunityComponent } from './opportunity/components/viewopportunities/view-opportunity/view-opportunity.component';
import { EditOpportunityComponent } from './opportunity/components/edit-opportunity/edit-opportunity/edit-opportunity.component';
import { ViewTrendsComponent } from './opportunity/components/view-trends/view-trends/view-trends.component';
import { SideNavBarComponent } from './side-nav/components/side-nav/side-nav-bar/side-nav-bar.component';
import { ErrorHandlingComponent } from './error/components/error-handling/error-handling.component';
import { ViewOpportunityVersionsComponent } from './opportunity/components/view-versions/view-opportunity-versions/view-opportunity-versions.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AddOpportunityComponent,
    ViewOpportunityComponent,
    EditOpportunityComponent,
    ViewTrendsComponent,
    SideNavBarComponent,
    ErrorHandlingComponent,
    ViewOpportunityVersionsComponent,


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatFormFieldModule,
    MatChipsModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatPaginatorModule,
    MatTableModule,
    MatMenuModule,
    ChartsModule,
    ScrollingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,

    {
      provide: AuthServiceConfig,
      useFactory: socialConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
