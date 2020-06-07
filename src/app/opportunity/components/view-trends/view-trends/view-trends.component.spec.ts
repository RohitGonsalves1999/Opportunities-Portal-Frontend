import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTrendsComponent } from './view-trends.component';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { APIService } from 'src/app/providers/api.service';

class MockAPIService {

  private data = [];

  constructor() {
    this.data['/jobInsights'] = {"locationdetails":{"values":[3,3,2,2],"labels":["Gurugram","Seattle, US","Bengaluru","Mumbai"]},"skillSet":{"values":[8,7,7,7,6,4,3,3,3,2,1],"labels":["Android","Git","AngularJS","Angular","Swift","DevOps","React","React Native","Data Structures","Networking","C++"]},"employmentType":{"values":[5,3,1,1],"labels":["Full Time","Part Time","Internship","Contract"]},"profile":{"values":[4,2,1,1,1,1],"labels":["Technical Analyst","SDE","SDE II","Technical Delivery Manager","Software Tester","IT Personnel"]},"hiringManager":{"values":[4,3,2,1],"labels":["Ida Gonsalves","Aravind Loganathan","Darshan Patil","Abhigyan Nayak"]},"resolvedSkillSet":{"values":[1,1,1,1,1],"labels":["Swift","Python","Machine Learning","Project Management","C++"]}};
  }
  callApi(url){
    
    return of(this.data[url]);

  }
}

describe('ViewTrendsComponent', () => {
  let component: ViewTrendsComponent;
  let fixture: ComponentFixture<ViewTrendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTrendsComponent ],
      imports: [
        AppRoutingModule,
      ],
      providers: [
        {
          provide: APIService,
          useClass: MockAPIService,
        },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTrendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
