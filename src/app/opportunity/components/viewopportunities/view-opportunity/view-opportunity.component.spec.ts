import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOpportunityComponent } from './view-opportunity.component';
import { Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { APIService } from 'src/app/providers/api.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { from } from 'rxjs';
import { MatOptionModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { Observable, of } from 'rxjs';

class MockAPIService {

  private data = [];

  constructor() {
    this.data['/DropDownMap'] = {"locationdetails":{"1":"Mumbai","2":"Bengaluru","3":"Gurugram","4":"Delhi","5":"Seattle, US","6":"Vancouver, CA","7":"Dallas, TX","8":"Chennai"},"skillSet":{"1":"Git","2":"Angular","3":"AngularJS","4":"React","5":"React Native","6":"MySQL","7":"PostgreSQL","8":"DevOps","9":"Networking","10":"Android","11":"Swift","12":"C++","13":"Data Structures","14":"Project Management","15":"Python","16":"Machine Learning"},"employmentType":{"1":"Contract","2":"Full Time","3":"Part Time","4":"Internship"},"profile":{"1":"SDE II","2":"Software Tester","3":"Technical Analyst","4":"SDE","5":"IT Personnel","6":"Project Manager","7":"Hiring Manager","8":"Technical Delivery Manager","9":"HR Personnel","10":"CTO","11":"CEO"},"hiringManager":{"1":"Aravind Loganathan","2":"Darshan Patil","3":"Abhigyan Nayak","4":"Ida Gonsalves"}};
    this.data['/JobDescription/'] = [{"jobDescription":{"id":9,"profile":2,"location":3,"employmentType":2,"hiringManager":2,"openings":5,"postedOn":1590949800000,"postedBy":1,"lastUpdated":null,"lastUpdatedBy":-1,"description":"Really Awesome Job"},"skillList":[1,3]},{"jobDescription":{"id":10,"profile":2,"location":3,"employmentType":2,"hiringManager":3,"openings":8,"postedOn":1590949800000,"postedBy":1,"lastUpdated":1591036200000,"lastUpdatedBy":0,"description":"Really Awesome Job"},"skillList":[1,3,8,11,10,2]},{"jobDescription":{"id":11,"profile":2,"location":3,"employmentType":2,"hiringManager":4,"openings":6,"postedOn":1590949800000,"postedBy":1,"lastUpdated":1591036200000,"lastUpdatedBy":0,"description":"Really Awesome Job"},"skillList":[1,3,8,11,10,2]},{"jobDescription":{"id":12,"profile":2,"location":7,"employmentType":2,"hiringManager":4,"openings":6,"postedOn":1590949800000,"postedBy":1,"lastUpdated":1591122600000,"lastUpdatedBy":0,"description":"Really Awesome Job"},"skillList":[1,3,8,11,10,2]}];
    this.data['/delete/10'] = {status: 200};
    this.data['/resolveJobDescription/10'] = {status: 200};
  }
  callApi(url){
    
    return of(this.data[url]);

  }
}


describe('ViewOpportunityComponent', () => {
  let component: ViewOpportunityComponent;
  let fixture: ComponentFixture<ViewOpportunityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOpportunityComponent],
      imports: [
        AppRoutingModule,
        MatDialogModule,
        MatSnackBarModule,
        MatOptionModule,
        MatInputModule,
        MatPaginatorModule,
        MatTableModule,
        MatMenuModule,
        MatIconModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatSelectModule,

      ],
      providers:[
        {
          provide: APIService,
          useClass: MockAPIService,
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOpportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sort numeric', () => {
    component.onSortData('openings');
    expect(component.dataSource.data.length).toBeGreaterThan(0);
  });

  it('should sort numeric again', () => {
    component.sortColumn = 'openings';
    component.onSortData('openings');
    expect(component.dataSource.data.length).toBeGreaterThan(0);
  });

  it('should sort text', () => {
    component.onSortData('location');
    expect(component.dataSource.data.length).toBeGreaterThan(0);
  });

  it('should test Job', () => {
    component.filterString = 'gur';
    component.testJob(component.dataSource.data[0]);
    expect(component.dataSource.data.length).toBeGreaterThan(0);
  });

  it('should filter data', () => {
    component.applyFilter({target: {value: 'gur'}});
    expect(component.dataSource.data.length).toBeGreaterThan(0);
  });
  

  it('should filter data none', () => {
    component.toppingList = [];
    component.toppings.setValue([]);
    component.applyFilter({target: {value: 'gur'}});
    expect(component.dataSource.data.length).toBe(0);
  });

  it('should not sort', () => {
    component.sortColumn = (undefined);
    component.sortData();
    expect(component.dataSource.data.length).toBeGreaterThan(0);
  });
  
  it('should test Job', () => {
    component.filterString = 'gur';
    component.testJob(component.dataSource.data[0]);
    expect(component.dataSource.data.length).toBeGreaterThan(0);
  });


  it('should Delete', () => {
    component.deleteJob(10)
    expect(component.dataSource.data.length).toBeGreaterThan(0);
  });

  it('should Resolve', () => {
    component.resolveJob(10);
    expect(component.dataSource.data.length).toBeGreaterThan(0);
  });

  

  

  it('should Open Dialog', () => {
    component.openDialog(component.dataSource.data[0]);
    expect(component.dataSource.data.length).toBeGreaterThan(0);

    
  });

  it('should navigate to edit', () => {
    component.navigateToEdit(5);
    expect(component.dataSource.data.length).toBeGreaterThan(0);

    
  });

  it('should navigate to versions', () => {
    component.navigateToVersions(31);
    expect(component.dataSource.data.length).toBeGreaterThan(0);

    
  });
});
