import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOpportunityComponent } from './add-opportunity.component';
import { of } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APIService } from 'src/app/providers/api.service';
import { ActivatedRoute } from '@angular/router';

class MockAPIService {

  private data = [];

  constructor() {
    this.data['/DropDownItems'] = { "locationdetails": [{ "id": 1, "name": "Mumbai" }, { "id": 2, "name": "Bengaluru" }, { "id": 3, "name": "Gurugram" }, { "id": 4, "name": "Delhi" }, { "id": 5, "name": "Seattle, US" }, { "id": 6, "name": "Vancouver, CA" }, { "id": 7, "name": "Dallas, TX" }, { "id": 8, "name": "Chennai" }], "skillSet": [{ "id": 1, "name": "Git" }, { "id": 2, "name": "Angular" }, { "id": 3, "name": "AngularJS" }, { "id": 4, "name": "React" }, { "id": 5, "name": "React Native" }, { "id": 6, "name": "MySQL" }, { "id": 7, "name": "PostgreSQL" }, { "id": 8, "name": "DevOps" }, { "id": 9, "name": "Networking" }, { "id": 10, "name": "Android" }, { "id": 11, "name": "Swift" }, { "id": 12, "name": "C++" }, { "id": 13, "name": "Data Structures" }, { "id": 14, "name": "Project Management" }, { "id": 15, "name": "Python" }, { "id": 16, "name": "Machine Learning" }], "employmentType": [{ "id": 1, "name": "Contract" }, { "id": 2, "name": "Full Time" }, { "id": 3, "name": "Part Time" }, { "id": 4, "name": "Internship" }], "profile": [{ "id": 3, "name": "Technical Analyst" }, { "id": 4, "name": "SDE" }, { "id": 5, "name": "IT Personnel" }, { "id": 6, "name": "Project Manager" }, { "id": 7, "name": "Hiring Manager" }, { "id": 8, "name": "Technical Delivery Manager" }, { "id": 9, "name": "HR Personnel" }, { "id": 10, "name": "CTO" }, { "id": 11, "name": "CEO" }, { "id": 1, "name": "SDE II" }, { "id": 2, "name": "Software Tester" }], "hiringManager": [{ "id": 1, "name": "Aravind Loganathan" }, { "id": 2, "name": "Darshan Patil" }, { "id": 3, "name": "Abhigyan Nayak" }, { "id": 4, "name": "Ida Gonsalves" }] };
    this.data['/JobDescription'] = { "jobDescription": { "id": 31, "profile": 2, "location": 5, "employmentType": 2, "hiringManager": 4, "openings": 6, "postedOn": 1590949800000, "postedBy": 1, "lastUpdated": 1591122600000, "lastUpdatedBy": 0, "description": "Really Awesome Job" }, "skillList": [1, 3, 8, 11, 10, 2] };
    this.data['/delete/10'] = { status: 200 };
    this.data['/resolveJobDescription/10'] = { status: 200 };
  }
  callApi(url) {

    return of(this.data[url]);

  }

  callApiPost(url, data) {
    return this.callApi(url);
  }
}

describe('AddOpportunityComponent', () => {
  let component: AddOpportunityComponent;
  let fixture: ComponentFixture<AddOpportunityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddOpportunityComponent],
      imports: [
        AppRoutingModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatSelectModule,
        MatInputModule,
        MatChipsModule,
        BrowserAnimationsModule
      ],

      providers: [
        {
          provide: APIService,
          useClass: MockAPIService,
        },
        {
          provide: ActivatedRoute, useValue: {
            params: of({ id: 31 })
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOpportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset form', () => {
    component.resetForm();
    expect(component.location).toBeDefined();
  });


  it('should add chip', () => {
    component.add({ value: 'Git', input: { value: 'Git' } })
    expect(component.location).toBeDefined();
  });


  it('should add chip fail', () => {
    component.add({ value: undefined, input: undefined })
    expect(component.location).toBeDefined();
  });


  it('should add skill', () => {
    component.fruitInput.nativeElement.value = 'AngularJS';
    component.selected({ option: { viewValue: 'AngularJS' } });
    expect(component.location).toBeDefined();
  });



  it('should remove chip', () => {
    component.remove('Git');
    expect(component.location).toBeDefined();
  });


  it('should remove chip non empty', () => {
    component.fruits.push('Git');
    component.selectedSkills.push(1);
    component.remove('Git');
    expect(component.location).toBeDefined();
  });


  it('should remove chip empty', () => {
    component.remove('Spring');
    expect(component.location).toBeDefined();
  });

  it('should Submit', () => {
    component.onSubmit();
    expect(component.location).toBeDefined();
  });

  it('should Filter', () => {
    component._filter('Git');
    expect(component.location).toBeDefined();
  });


  it('should Submit success', () => {
    component.jobDescriptionForm.controls['profile'].setValue(1);
    component.jobDescriptionForm.controls['employmentType'].setValue(1);
    component.jobDescriptionForm.controls['hiringManager'].setValue(1);
    component.jobDescriptionForm.controls['location'].setValue(1);
    component.jobDescriptionForm.controls['openings'].setValue(1);
    component.jobDescriptionForm.controls['description'].setValue('Best Job Description');
    component.jobDescriptionForm.controls['skills'].setValue([1, 2, 3, 4]);
    component.onSubmit();
    expect(component.location).toBeDefined();
  });
});
