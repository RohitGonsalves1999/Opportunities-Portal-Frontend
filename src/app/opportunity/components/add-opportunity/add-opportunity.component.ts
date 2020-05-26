import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/providers/api.service';
import { Router } from '@angular/router';
import { DropDownItem } from '../../../models/DropDownItem';

@Component({
  selector: 'app-add-opportunity',
  templateUrl: './add-opportunity.component.html',
  styleUrls: ['./add-opportunity.component.css']
})
export class AddOpportunityComponent implements OnInit {

  constructor(private API: APIService, private router: Router) { }


  ngOnInit(): void {
    this.API.callApi('/getDropDownItems').subscribe((response: any) => {
      console.log(response);
    }) ;
  }

}
