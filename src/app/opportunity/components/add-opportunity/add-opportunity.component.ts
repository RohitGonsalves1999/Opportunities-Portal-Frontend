import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { APIService } from 'src/app/providers/api.service';
import { Router } from '@angular/router';
import { DropDownItem } from '../../../models/DropDownItem';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LOCATION, PROFILE, HIRING_MANAGERS, EMPLOYMENT_TYPE, SKILLS, USER_ID } from 'src/app/constants/constants';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, startWith } from 'rxjs/operators';
import { JobDescription } from 'src/app/models/JobDescription';
import { JobDescriptionWithSkills } from 'src/app/models/JobDescriptionWithSkills';
import { CustomValidators } from 'src/app/utils/CustomValidators';

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

  jobDescriptionForm = new FormGroup({
    profile: new FormControl('', [Validators.required]),
    employmentType: new FormControl('', [Validators.required]),
    openings: new FormControl(this.openings, [Validators.required, Validators.min(1), Validators.max(10)]),
    location: new FormControl(this.selectedLocation, [Validators.required]),
    hiringManager: new FormControl('', [Validators.required]),
    skills: new FormControl([], CustomValidators.validateRequired),
    description: new FormControl('', [Validators.required, Validators.maxLength(2000), Validators.minLength(10)]),

  });



  add(event): void {
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

  selected(event): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);

    this.selectedSkills.push(this.skillMap.get(event.option.viewValue));
    // tslint:disable-next-line: no-string-literal
    this.jobDescriptionForm.controls['skills'].setValue(this.selectedSkills.map(x => x));
  }

   _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.skillSet.map(x => x.name).filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }


  onSubmit() {

    if(!this.jobDescriptionForm.valid){
      console.log('Invalid Form');
      return;
    }
    const job = new JobDescription();
    job.description = this.jobDescriptionForm.value.description;
    job.employmentType = this.jobDescriptionForm.value.employmentType;
    job.hiringManager = this.jobDescriptionForm.value.hiringManager;
    job.location = this.jobDescriptionForm.value.location;
    job.openings = this.jobDescriptionForm.value.openings;
    job.profile = this.jobDescriptionForm.value.profile;
    job.postedBy = Number.parseInt(sessionStorage.getItem(USER_ID));
    const jobSkill = new JobDescriptionWithSkills();
    jobSkill.jobDescription = job;
    jobSkill.skillList = this.jobDescriptionForm.value.skills;
    console.log('Ready to go: ', jobSkill);

    this.API.callApiPost('/JobDescription', jobSkill).subscribe((res: any) => {
      console.log(res);
      // location.reload();
      this.router.navigate(['all']);
    });

  }

  resetForm() {
    this.jobDescriptionForm.reset();

    this.selectedSkills = [];
    this.fruits.splice(0, this.fruits.length);
    this.jobDescriptionForm.clearValidators();
  }

  ngOnInit(): void {
    this.API.callApi('/DropDownItems').subscribe((response: Map<string, DropDownItem[]>) => {
      console.log(response);
      this.location = response[LOCATION];
      this.proflie = response[PROFILE];
      this.hiringManager = response[HIRING_MANAGERS];
      this.employmentType = response[EMPLOYMENT_TYPE];
      this.skillSet = response[SKILLS];

      this.skillSet.forEach(x => this.skillMap.set(x.name, x.id));
    });
  }




}
