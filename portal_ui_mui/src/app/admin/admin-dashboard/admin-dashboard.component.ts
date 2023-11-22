import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { StatsApiService } from 'src/app/common/service/stats-api.service';
Chart.register(...registerables);

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  public response_data: any = {
    active_student_cnt: 0,
    active_teacher_cnt: 0,
    in_active_student_cnt: 0,
    in_active_teacher_cnt: 0,
    organization_cnt: 0
  };
  public org_names: Array<string> = [];
  public teacher_cnts: Array<number> = [];
  public student_cnts: Array<number> = [];

  constructor(private _stats_api_service: StatsApiService) { }

  ngOnInit(): void {
    this.loadAdminStats();
  }

  loadAdminStats() {
    this._stats_api_service.getAdminStats().subscribe(
      (res: any) => {
        this.response_data = res;
        console.log(this.response_data);

        this.response_data.organization_data.forEach((obj: any) => {
          this.org_names.push(obj.name);
          this.teacher_cnts.push(obj.teacher_cnt);
          this.student_cnts.push(obj.student_cnt);
        });

        this.renderStatsChart();
      },
      (error: any) => {
        console.log(error)
      }
    )
  }

  renderStatsChart() {
    const orgChart = new Chart("orgchart", {
      type: 'bar',
      data: {
        labels: this.org_names,
        datasets: [{
          label: '# of Teachers',
          data: this.teacher_cnts,
          borderWidth: 1
        },
        {
          label: '# of Students',
          data: this.student_cnts,
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
