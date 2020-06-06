import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DialogData } from '../../viewopportunities/view-opportunity/view-opportunity.component';
import { MatTableDataSource } from '@angular/material/table';
import { JobDescriptionWithSkills } from 'src/app/models/JobDescriptionWithSkills';
import { HIRING_MANAGERS, EMPLOYMENT_TYPE, SKILLS, PROFILE, LOCATION } from 'src/app/constants/constants';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { APIService } from 'src/app/providers/api.service';

@Component({
  selector: 'app-view-opportunity-versions',
  templateUrl: './view-opportunity-versions.component.html',
  styleUrls: ['./view-opportunity-versions.component.css']
})
export class ViewOpportunityVersionsComponent implements OnInit {

  jobId = -1;

  constructor(
    private router: Router,
    private API: APIService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute) { 
      this.route.params.subscribe(params => {
        console.log(params);
        this.jobId = params.id;
      });
    }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  flipped = 0;


  toppings = new FormControl();
  toppingList: string[] = ['Profile', 'Location', 'Employment Type', 'Hiring Manager', 'Skills', 'Job Description'];
  jobsData: JobDescriptionWithSkills[] = [];
  filteredJobsData: JobDescriptionWithSkills[] = [];
  numericCols = ['openings', 'postedOn'];
  isSortOnNumericColumn = true;
  hiringManagers: Map<number, string>;
  skills: Map<number, string>;
  locations: Map<number, string>;
  employmentTypes: Map<number, string>;
  profiles: Map<number, string>;

  isAsc = true;
  sortColumn: string;

  public dataSource: MatTableDataSource<JobDescriptionWithSkills>;

  displayedColumns: string[] = [
    'profile',
    'employmentType',
    'location',
    'openings',
    'hiringManager',
    'skills',
    'postedOn',
    'jobDescription',
    'star'];
  filterString = '';
  getSkillsString(job) {
    return job.skillList.map(x => this.skills[x]).join(', ');
  }


  openSnackBar(message = 'Success!!!') {
    this._snackBar.open(message, 'Dismiss', {
      duration: 2000,
    });
  }

  applyFilter(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterString = filterValue;
    this.dataSource = new MatTableDataSource(this.jobsData.filter(x => this.testJob(x)));

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSortData(sortColumn) {

    console.log('YO');
    this.isSortOnNumericColumn = this.numericCols.includes(sortColumn);
    if (sortColumn == this.sortColumn) {
      this.isAsc = !this.isAsc;
    } else {
      this.sortColumn = sortColumn;
      this.isAsc = true
    }

    this.sortData();
  }

  sortData() {
    let data = this.dataSource.data;
    if (this.sortColumn != undefined) {
      data = data.sort((a, b) => {
        if (this.isSortOnNumericColumn) {
          return this.compare(a.jobDescription[this.sortColumn], b.jobDescription[this.sortColumn], this.isAsc);
        }
        else {
          console.log(this[this.sortColumn + 's'][a.jobDescription[this.sortColumn]]);
          return this.compare(
            this[this.sortColumn + 's'][a.jobDescription[this.sortColumn]]
          , this[this.sortColumn + 's'][b.jobDescription[this.sortColumn]], this.isAsc);
        }
      });
    }

    this.dataSource = new MatTableDataSource(data);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private compare(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }


  async deleteJob(id) {
    this.API.callApi(`/delete/${id}`).subscribe(res => {
      this.flipped = undefined;
      this.openSnackBar();
      this.ngOnInit();
    });
  }


  async resolveJob(id) {
    this.API.callApi(`/resolveJobDescription/${id}`).subscribe(res => {
      this.flipped = undefined;
      this.openSnackBar();
      this.ngOnInit();
    });
  }

  getJobString(job: JobDescriptionWithSkills) {
    const filterList = this.toppings.value ? this.toppings.value : this.toppingList;

    const location = this.locations[job.jobDescription.location];
    const profile = this.profiles[job.jobDescription.profile];
    const hiringManager = this.hiringManagers[job.jobDescription.hiringManager];
    const employmentType = this.employmentTypes[job.jobDescription.employmentType];
    const skills = this.getSkillsString(job);
    const jobDesc = job.jobDescription.description;

    let resultString = '';

    if (filterList.includes('Location')) {
      resultString += location;
    }

    if (filterList.includes('Profile')) {
      resultString += profile;
    }


    if (filterList.includes('Employment Type')) {
      resultString += employmentType;
    }

    if (filterList.includes('Hiring Manager')) {
      resultString += hiringManager;
    }

    if (filterList.includes('Skills')) {
      resultString += skills;
    }

    if (filterList.includes('Job Description')) {
      resultString += jobDesc;
    }

    console.log(resultString);
    return resultString;
  }

  testJob(job: JobDescriptionWithSkills) {

    console.log(this.getJobString(job));

    const regex = new RegExp(this.filterString.toLowerCase());
    return regex.test(this.getJobString(job).toLowerCase());

  }

  filterData() {
    this.flipped = undefined;
    console.log('Filter: ', this.filterString);

    this.filteredJobsData = this.jobsData.filter(x => this.testJob(x));
  }

  openDialog(job: JobDescriptionWithSkills) {

    this.dialog.open(DialogOverviewExampleDialog, {
      data: {
        animal: job.jobDescription.description
      }
    });
  }


  navigateToEdit(jobId) {
    this.router.navigate(['edit', jobId]);
  }

  ngOnInit(): void {

    this.API.callApi('/DropDownMap').subscribe((response => {
      console.log(response);
      this.locations = response[LOCATION];
      this.profiles = response[PROFILE];
      this.hiringManagers = response[HIRING_MANAGERS];
      this.employmentTypes = response[EMPLOYMENT_TYPE];
      this.skills = response[SKILLS];


      console.log(this.skills);
    }));

    this.API.callApi(`/JobVersions/${this.jobId}`).subscribe((res: JobDescriptionWithSkills[]) => {
      console.log(res[0]);
      this.jobsData = res;
      this.filteredJobsData = res;
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
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
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}