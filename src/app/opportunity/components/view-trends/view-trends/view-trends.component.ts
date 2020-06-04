import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, Color, MultiDataSet } from 'ng2-charts';
import { Router } from '@angular/router';
import { APIService } from 'src/app/providers/api.service';
import { ChartData } from 'src/app/models/ChartData';

@Component({
  selector: 'app-view-trends',
  templateUrl: './view-trends.component.html',
  styleUrls: ['./view-trends.component.css']
})
export class ViewTrendsComponent implements OnInit {

  constructor(
    private router: Router,
    private API: APIService,
  ) { }

  opportunities = 0;
  pieLegends = false;
  yAxes = [{ id: 'y-axis-1', type: 'linear', position: 'left', ticks: { min: 0, max: 100 } }];

  skillChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: true
    },
    scales: {
      yAxes: [{ id: 'y-axis-1', type: 'linear', position: 'left', ticks: { min: 0 } }],

    },

  };
  skillChartLabels: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
  skillChartType: ChartType = 'bar';
  skillChartLegend = true;
  skillChartPlugins = [];

  skillChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46, 33], label: 'Skill Count' }
  ];


  locationChartLabels: Label[] = ['BMW', 'Ford', 'Tesla'];
  locationChartData: MultiDataSet = [
    [55, 25, 20],
  ];
  locationChartType: ChartType = 'doughnut';


  hiringManagerChartLabels = ['BMW', 'Ford', 'Tesla'];
  hiringManagerChartData: MultiDataSet = [
    [55, 25, 20],
  ];
  hiringManagerChartType: ChartType = 'doughnut';


  public radarChartLabels = ['Q1', 'Q2', 'Q3', 'Q4'];
  public radarChartData = [
    { data: [120, 130, 180, 70], label: '2017' },
  ];
  public radarChartType = 'radar';


  radarChartOptions: ChartOptions = {
    scale: {
      ticks: {
        min: 0,
      }
    }
  }


  profileChartLabels: Label[] = ['BMW', 'Ford', 'Tesla', 'chevy', 'F!', 'AUDI'];
  profileChartData: MultiDataSet = [
    [55, 25, 20, 25, 30, 35],
  ];
  profileChartType: ChartType = 'doughnut';


  employmentTypeChartLabels: Label[] = ['BMW', 'Ford', 'Tesla'];
  employmentTypeData: MultiDataSet = [
    [55, 25, 20],
  ];
  employmentChartType: ChartType = 'doughnut';




  ngOnInit(): void {
    this.API.callApi('/jobInsights').subscribe((res: ChartData) => {
      console.log(res);
      this.skillChartLabels = res.skillSet.labels;
      this.skillChartData = [
        { data: res.skillSet.values, label: 'Skill Count' }
      ];

      this.locationChartLabels = res.locationdetails.labels;
      this.locationChartData = [
        res.locationdetails.values,
      ];

      this.hiringManagerChartLabels = res.hiringManager.labels;
      this.hiringManagerChartData = [res.hiringManager.values];

      this.radarChartLabels = res.skillSet.labels;
      this.radarChartData = [
        { data: res.skillSet.values, label: 'Skill Count' }
      ];


      this.profileChartLabels = res.profile.labels;
      this.profileChartData = [res.profile.values];

      this.employmentTypeChartLabels = res.employmentType.labels;
      this.employmentTypeData = [res.employmentType.values];
    });



  }

}
