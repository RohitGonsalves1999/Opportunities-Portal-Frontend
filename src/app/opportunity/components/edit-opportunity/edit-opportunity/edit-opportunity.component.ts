import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { LOCATION, HIRING_MANAGERS, PROFILE, EMPLOYMENT_TYPE, SKILLS, USER_ID } from 'src/app/constants/constants';
import { JobDescriptionWithSkills } from 'src/app/models/JobDescriptionWithSkills';
import { JobDescription } from 'src/app/models/JobDescription';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { APIService } from 'src/app/providers/api.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';
import { DropDownItem } from 'src/app/models/DropDownItem';
import { map, startWith } from 'rxjs/operators';
import { CustomValidators } from 'src/app/utils/CustomValidators';

@Component({
  selector: 'app-edit-opportunity',
  templateUrl: './edit-opportunity.component.html',
  styleUrls: ['./edit-opportunity.component.css']
})
export class EditOpportunityComponent implements OnInit {

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

  jobId = -1;
  jobObject: JobDescriptionWithSkills;

  constructor(
    private API: APIService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) {

    this.route.params.subscribe(params => {
      console.log(params);
      this.jobId = params.id;
    });

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
    const job = new JobDescription();
    job.id = this.jobId;
    job.description = this.jobDescriptionForm.value.description;
    job.employmentType = this.jobDescriptionForm.value.employmentType;
    job.hiringManager = this.jobDescriptionForm.value.hiringManager;
    job.location = this.jobDescriptionForm.value.location;
    job.openings = this.jobDescriptionForm.value.openings;
    job.profile = this.jobDescriptionForm.value.profile;
    job.lastUpdatedBy =  Number.parseInt(sessionStorage.getItem(USER_ID));
    const jobSkill = new JobDescriptionWithSkills();
    jobSkill.jobDescription = job;
    jobSkill.skillList = this.jobDescriptionForm.value.skills;
    console.log('Ready to go: ', jobSkill);

    this.API.callApiPost('/JobDescription/update', jobSkill).subscribe((res: any) => {
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


  populateJobDescription() {
    this.API.callApi(`/JobDescription/${this.jobId}`).subscribe((res: JobDescriptionWithSkills) => {
      console.log(res);
      this.jobObject = res;

      this.jobDescriptionForm.controls['profile'].setValue(res.jobDescription.profile);
      this.jobDescriptionForm.controls['employmentType'].setValue(res.jobDescription.employmentType);
      this.jobDescriptionForm.controls['hiringManager'].setValue(res.jobDescription.hiringManager);
      this.jobDescriptionForm.controls['location'].setValue(res.jobDescription.location);
      this.jobDescriptionForm.controls['openings'].setValue(res.jobDescription.openings);
      this.jobDescriptionForm.controls['description'].setValue(res.jobDescription.description);
      this.jobDescriptionForm.controls['skills'].setValue(res.skillList);

      console.log(res.skillList);

      this.selectedSkills = res.skillList;
      this.fruits = res.skillList.map(x => this.skillSet.filter(y => y.id === x )[0].name);
    });
  }

  ngOnInit(): void {

    if (this.jobId === -1) {
      this.router.navigate(['all']);
      return;
    }


    this.API.callApi('/DropDownItems').subscribe((response: Map<string, DropDownItem[]>) => {
      console.log(response);
      this.location = response[LOCATION];
      this.proflie = response[PROFILE];
      this.hiringManager = response[HIRING_MANAGERS];
      this.employmentType = response[EMPLOYMENT_TYPE];
      this.skillSet = response[SKILLS];

      this.skillSet.forEach(x => this.skillMap.set(x.name, x.id));

      this.populateJobDescription();
    });


    
  }


}
