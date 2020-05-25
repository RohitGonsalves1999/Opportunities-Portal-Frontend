import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { GoogleLoginProvider, AuthService } from 'angularx-social-login';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { socialConfigs } from '../app/utils/socialConfigs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
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
