import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'de-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  public doughnutChartLabels: string[] = ['Domains', 'Data Models', 'Clients'];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] =
    [
      {
        data: [3, 0, 0],
        label: 'Domains',
        borderColor: 'rgba(1,65,231,.5)',
        backgroundColor: ['#0241e7', '#5c89fe', '#a3afb7'],
        hoverBackgroundColor: '#0241e7',
        hoverBorderColor: 'rgba(92,137,254,.5)',
      },
      {
        data: [0, 4, 0],
        label: 'Data Models',
        borderColor: 'rgba(92,137,254,.5)',
        backgroundColor: ['#0241e7', '#5c89fe', '#a3afb7'],
        hoverBackgroundColor: '#5c89fe',
        hoverBorderColor: 'rgba(1,65,231,.5)',
      },
      {
        data: [0, 0, 1],
        label: 'Clients',
        borderColor: 'rgba(163,175,183,.5)',
        backgroundColor: ['#0241e7', '#5c89fe', '#a3afb7'],
        hoverBackgroundColor: '#13192b80',
        hoverBorderColor: 'rgba(59,66,85,.5)',
      },
    ];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    font: {
      family: 'sans-serif',
    },
  };
}
