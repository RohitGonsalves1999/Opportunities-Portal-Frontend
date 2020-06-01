import { Component } from '@angular/core';
import { SESSION, USER_ID, USER_EMAIL, USER_TOKEN } from './constants/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router) { }
  title = 'opportunities-portal';
  mode = { value: 'over' };


  sessionValue = JSON.parse(sessionStorage.getItem(SESSION));


  logout() {
    sessionStorage.setItem(USER_ID, '-1');
    sessionStorage.setItem(USER_EMAIL, '');
    sessionStorage.setItem(USER_TOKEN, 'jddfjkdjgkojvx');
    sessionStorage.setItem(SESSION, 'false');
    window.location.reload();
  }
}
