import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss']
})
export class TeacherDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.renderGraphs();
    this.renderSecondGraph();
  }

  renderGraphs() {
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

  renderSecondGraph() {
    const attemptChart = new Chart("attemptChart", {
      type: 'bar',
      data: {
        labels: ['quiz1', 'quiz2', 'quiz3', 'quiz4', 'quiz5', 'quiz6'],
        datasets: [{
          label: '# of Attempts',
          data: [8, 10, 5, 2, 9, 10],
          borderWidth: 1,
          backgroundColor: '#ff6384'
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
        }
      }
    });
  }

}
