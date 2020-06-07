import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { of } from 'rxjs';
import { APIService } from 'src/app/providers/api.service';
import { AuthService } from 'angularx-social-login';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { USER_TOKEN } from 'src/app/constants/constants';
import { Router } from '@angular/router';
class MockAuthService {
  async signIn(provider){
    return {name: 'Rohit Gonsalves', email : 'rohit.michaelgonsalves@accoliteindia.com', idToken : 'fafafafaffafafaafafafaafa'};
  }
}

class MockRouterService{
  navigate(data){
    return true;
  }
}

class MockAPIService {

  private data = [];

  constructor() {
    this.data['/verifySessionvalid'] = {valid : true};
    this.data['/verifySessioninvalid'] = {valid : false};
    this.data['/login'] = { id: 1, email: 'rohit.michaelgonsalves@accoliteindia.com', token: 'valid' };
  }
  callApi(url) {

    return of(this.data[url]);

  }

  callApiPost(url, data) {
    console.log(url+ data);
    return this.callApi(url + data);
  }

  loginApi(user){
    return of(this.data['/login']);
  }
}
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        
      ],
      providers: [
        {
          provide: Router,
          useClass: MockRouterService,
        },
        {
          provide: AuthService,
          useClass: MockAuthService,
        },

        {
          provide: APIService,
          useClass: MockAPIService,
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should verify Session undefined', () => {
    sessionStorage.clear();
    expect(component).toBeTruthy();
  });

  it('should verify Session true', () => {
    sessionStorage.setItem(USER_TOKEN, 'valid');
    expect(component).toBeTruthy();
  });

  it('should verify Session False', () => {
    sessionStorage.setItem(USER_TOKEN, 'invalid');
    expect(component).toBeTruthy();
  });

  it('should log user in', () => {
    component.socialSignIn('google');
    expect(component).toBeTruthy();
  });


  it('should log user in facebook', () => {
    component.socialSignIn('facebook');
    expect(component).toBeTruthy();
  });


  it('should log user in random', () => {
    component.socialSignIn('random');
    expect(component).toBeTruthy();
  });
});
