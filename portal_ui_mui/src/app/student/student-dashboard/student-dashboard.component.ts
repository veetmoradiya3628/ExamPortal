import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    this.renderGraphs();
  }

  renderGraphs(){
    const classChart = new Chart("classChart", {
      type: 'bar',
      data: {
        labels: ['class1', 'class2', 'class3', 'class4', 'class5', 'class6'],
        datasets: [{
          label: '# of Posts',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        },
        {
          label: '# of Students',
          data: [8, 10, 5, 2, 9, 10],
          borderWidth: 1
        },
        {
          label: '# of Quizzes',
          data: [8, 10, 5, 2, 9, 10],
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
