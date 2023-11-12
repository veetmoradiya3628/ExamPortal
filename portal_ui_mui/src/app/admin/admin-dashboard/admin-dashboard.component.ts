import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.renderStatsChart();
  }

  renderStatsChart() {
    const orgChart = new Chart("orgchart", {
      type: 'bar',
      data: {
        labels: ['Org1', 'Org2', 'Org3', 'Org4234536755543425367565432', 'Purple', 'Orange', 'Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Teachers',
          data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3],
          borderWidth: 1
        },
        {
          label: '# of Students',
          data: [8, 10, 5, 2, 9, 10, 12, 11, 0, 12, 1, 9],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}
