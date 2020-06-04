import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angularx-social-login';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { Router } from '@angular/router';
import { APIService } from 'src/app/providers/api.service';
import { USER_ID, USER_EMAIL, USER_TOKEN, SESSION } from 'src/app/constants/constants';
import { User } from 'src/app/models/User';
import { AuthGuardService } from '../../providers/auth-guard/auth-guard.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string;

  constructor(
    public OAuth: AuthService,
    private router: Router,
    private API: APIService,
    private authguard: AuthGuardService,
    ) { }

  ngOnInit() {
    if (![null, undefined, ''].includes(sessionStorage.getItem(USER_TOKEN))){
      this.API.callApiPost('/verifySession',
      sessionStorage.getItem(USER_TOKEN)).subscribe((res) => {
        if(res['valid']){
          this.router.navigate(['all']);
        }
      });
    }
  }


  public socialSignIn(socialProvider: string) {
    let socialPlatformProvider;
    if (socialProvider === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialProvider === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.OAuth.signIn(socialPlatformProvider).then(socialusers => {
      console.log(socialProvider, socialusers);
      console.log(socialusers.email);

      
      let user = new User();

      user.name = socialusers.name;
      user.email = socialusers.email;
      user.authToken = socialusers.idToken;
      this.login(user);
      // this.Savesresponse(socialusers);
    });
  }


  public login(user: User){
   
    
    this.API.loginApi(user).subscribe((res) => {

      console.log(res);

      sessionStorage.setItem(USER_ID, res[USER_ID]);
      sessionStorage.setItem(USER_EMAIL, res[USER_EMAIL]);
      sessionStorage.setItem(USER_TOKEN, res[USER_TOKEN]);
      sessionStorage.setItem(SESSION, 'true');
      window.location.reload();
      this.router.navigate(['all']);
    });
  }

}
