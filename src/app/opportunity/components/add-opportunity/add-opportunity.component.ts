import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { APIService } from 'src/app/providers/api.service';
import { Router } from '@angular/router';
import { DropDownItem } from '../../../models/DropDownItem';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LOCATION, PROFILE, HIRING_MANAGERS, EMPLOYMENT_TYPE, SKILLS } from 'src/app/constants/constants';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import {map, startWith} from 'rxjs/operators';
import { JobDescription } from 'src/app/models/JobDescription';
import { JobDescriptionWithSkills } from 'src/app/models/JobDescriptionWithSkills';

@Component({
  selector: 'app-add-opportunity',
  templateUrl: './add-opportunity.component.html',
  styleUrls: ['./add-opportunity.component.css']
})
export class AddOpportunityComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  fruits: string[] = [];


  visible = true;
  selectable = true;
  removable = true;

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;


  location: DropDownItem[];
  proflie: DropDownItem[];
  hiringManager: DropDownItem[];
  employmentType: DropDownItem[];
  skillSet: DropDownItem[] = [];
  skillMap: Map<string, number> = new Map();

  name = new FormControl('');

  selectedProfile: any;
  selectedHiringManager: any;
  selectedLocation: any;
  selectedEmploymentType: any;
  selectedSkills: number[] = [];
  jobDescription = '';
  openings = 0;

  constructor(
    private API: APIService,
    private router: Router,
    private formBuilder: FormBuilder) {
      this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => fruit ? this._filter(fruit) : this.skillSet.map(x => x.name).slice()));
     }

  jobDescriptionForm = this.formBuilder.group({
    profile: new FormControl(this.selectedProfile),
    employmentType: new FormControl(this.selectedEmploymentType),
    openings: new FormControl(this.openings),
    location: new FormControl(this.selectedLocation),
    hiringManager: new FormControl(this.selectedHiringManager),
    skills: new FormControl([]),
    description: new FormControl(this.jobDescription),

  });



  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    const idIndex = this.selectedSkills.indexOf(this.skillMap.get(fruit));

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }

    if (idIndex >= 0) {
      this.selectedSkills.splice(idIndex, 1);
    }

  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);

    this.selectedSkills.push(this.skillMap.get(event.option.viewValue));
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.skillSet.map(x => x.name).filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }


  onSubmit(){
    let job = new JobDescription();
    job.description = this.jobDescription;
    job.employmentType = this.selectedEmploymentType;
    job.hiringManager = this.selectedHiringManager;
    job.location = this.selectedLocation;
    job.openings = this.openings;
    job.profile = this.selectedProfile;
    job.postedBy = 1;
    let jobSkill = new JobDescriptionWithSkills();
    jobSkill.jobDescription = job;
    jobSkill.skillList = this.selectedSkills;

    this.API.callApiPost('/addJobDescription', jobSkill).subscribe((res:any) => {
      console.log(res);
      location.reload();
      //this.router.navigate(['home']);
    });
    
  }

  ngOnInit(): void {
    this.API.callApi('/getDropDownItems').subscribe((response: Map<string, DropDownItem[]>) => {
      console.log(response);
      this.location = response[LOCATION];
      this.proflie = response[PROFILE];
      this.hiringManager = response[HIRING_MANAGERS];
      this.employmentType = response[EMPLOYMENT_TYPE];
      this.skillSet = response[SKILLS];

      this.skillSet.forEach(x => this.skillMap.set(x.name, x.id));
    }) ;
  }




}
