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
  name = new FormControl('');

  constructor(
    private API: APIService,
    private router: Router,
    private formBuilder: FormBuilder) {
      this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => fruit ? this._filter(fruit) : this.skillSet.map(x => x.name).slice()));
     }

  jobDescriptionForm = this.formBuilder.group({
    profile: [''],
    employmentType: [''],
    openings: [''],
    location: [''],
    hiringManager: [''],
    skills: [[]],
    description: [''],

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

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.skillSet.map(x => x.name).filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit(): void {
    this.API.callApi('/getDropDownItems').subscribe((response: Map<string, DropDownItem[]>) => {
      console.log(response);
      this.location = response[LOCATION];
      this.proflie = response[PROFILE];
      this.hiringManager = response[HIRING_MANAGERS];
      this.employmentType = response[EMPLOYMENT_TYPE];
      this.skillSet = response[SKILLS];
    }) ;
  }

  


}
