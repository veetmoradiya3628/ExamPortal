import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { StatsApiService } from 'src/app/common/service/stats-api.service';
import { UserServiceService } from 'src/app/common/service/user-service.service';
Chart.register(...registerables);

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {

  public orgId!: string;
  public studentId!: string;
  public api_response: any = {};

  public classroom_names: Array<string> = [];
  public class_student_cnt: Array<number> = [];
  public class_teacher_cnt: Array<number> = [];
  public class_quiz_cnt: Array<number> = [];
  public class_post_cnt: Array<number> = [];

  constructor(private _stats_api_service: StatsApiService,
    private _userService: UserServiceService) {
    this.orgId = this._userService.getLoginUserOrganizationId();
    this.studentId = this._userService.getLoggedInUserId();
  }

  ngOnInit(): void {
    this.loadStudentStats();
  }

  loadStudentStats(){
    this._stats_api_service.getTeacherStats({ organization_id: this.orgId, teacher_id: this.studentId }).subscribe(
      (res: any) => {
        this.api_response = res;

        this.api_response.classroom_stats.forEach((class_obj: any) => {
          this.classroom_names.push(class_obj.classroom_name.substring(0, 25)) // .substring(0, 15)
          this.class_student_cnt.push(class_obj.student_cnt)
          this.class_teacher_cnt.push(class_obj.teacher_cnt)
          this.class_quiz_cnt.push(class_obj.quizzes_cnt)
          this.class_post_cnt.push(class_obj.posts_cnt)
        });

        // this.api_response.quiz_stats.forEach((quiz_obj: any) => {
        //   this.quiz_names.push(quiz_obj.quiz_name.substring(0, 25)) // .substring(0, 15)
        //   this.quiz_attempt_cnt.push(quiz_obj.attempt_cnt)
        // });

        this.renderClassStats();
      },
      (error: any) => {
        console.log(error)
      }
    )
  }

  renderClassStats() {
    const classChart = new Chart("classChart", {
      type: 'bar',
      data: {
        labels: this.classroom_names,
        datasets: [{
          label: '# of Posts',
          data: this.class_post_cnt,
          borderWidth: 1
        },
        {
          label: '# of Students',
          data: this.class_student_cnt,
          borderWidth: 1
        },
        {
          label: '# of Quizzes',
          data: this.class_quiz_cnt,
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
