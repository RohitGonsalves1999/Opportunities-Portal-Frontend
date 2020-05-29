import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from 'src/app/providers/api.service';
import { JobDescriptionWithSkills } from 'src/app/models/JobDescriptionWithSkills';
import { LOCATION, PROFILE, HIRING_MANAGERS, EMPLOYMENT_TYPE, SKILLS } from 'src/app/constants/constants';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-view-opportunity',
  templateUrl: './view-opportunity.component.html',
  styleUrls: ['./view-opportunity.component.css']
})
export class ViewOpportunityComponent implements OnInit {

  constructor(
    private router: Router,
    private API: APIService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar) { }


    flipped = 0;

  
    jobsData: JobDescriptionWithSkills[] = [];
    filteredJobsData: JobDescriptionWithSkills[] = [];

    hiringManagers: Map<number, string>;
    skills: Map<number, string>;
    locations: Map<number, string>;
    employmentTypes: Map<number, string>;
    profiles: Map<number, string>;


    filterString = '';
    getSkillsString(job) {
    return job.skillList.map(x => this.skills[x]).join(', ');
  }


  openSnackBar() {
    this._snackBar.open('Deleted Successfully', 'Dismiss', {
      duration: 2000,
    });
  }


  async deleteJob(id){
    this.API.callApi(`/deleteJobDescription/${id}`).subscribe(res => {
      this.flipped = undefined;
      this.openSnackBar();
      this.ngOnInit();
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: 'Rohit', animal: 'Panda'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      return result;
    });
  }

  getJobString(job: JobDescriptionWithSkills){
    let location = this.locations[job.jobDescription.location];
    let profile = this.profiles[job.jobDescription.profile];
    let hiringManager =  this.hiringManagers[job.jobDescription.hiringManager]
    let employmentType = this.employmentTypes[job.jobDescription.employmentType];
    let skills = this.getSkillsString(job);
    let jobDesc = job.jobDescription.description;
    return location + profile + hiringManager + employmentType + skills + jobDesc;
  }

  testJob(job: JobDescriptionWithSkills) {

    console.log(this.getJobString(job));

    let regex = new RegExp(this.filterString.toLowerCase());
    return regex.test(this.getJobString(job).toLowerCase());

  }

  filterData(){
    this.flipped = undefined;
    console.log("Filter: ", this.filterString);

    this.filteredJobsData = this.jobsData.filter(x => this.testJob(x));
  }

  ngOnInit(): void {

    this.API.callApi('/getDropDownMap').subscribe((response => {
      console.log(response);
      this.locations = response[LOCATION];
      this.profiles = response[PROFILE];
      this.hiringManagers = response[HIRING_MANAGERS];
      this.employmentTypes = response[EMPLOYMENT_TYPE];
      this.skills = response[SKILLS];
      

      console.log(this.skills);
    }));

    this.API.callApi('/getAllJobDescriptions/').subscribe((res: JobDescriptionWithSkills[]) => {
      console.log(res[0]);
      this.jobsData = res;
      this.filteredJobsData = res;
    });
  }

}





@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}