import { Injectable } from '@angular/core';
import { AuthServiceService } from '../auth-service/auth-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(public auth: AuthServiceService, public router: Router) {}

  async canActivate() {
    let session = await this.auth.verifySession();
    console.log('session: ', session);
    if (!session) {
      console.log('session inside if: ', session);
      this.router.navigate(['login']);
      return session;
    }
    return session;
  }
}
