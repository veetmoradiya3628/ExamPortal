import { Component, Input, OnInit } from '@angular/core';
import { Quiz } from 'src/app/models/quiz.model';
import { OrgAdminServiceService } from 'src/app/services/org-admin-service.service';

@Component({
  selector: 'app-teacher-class-quizzes',
  templateUrl: './teacher-class-quizzes.component.html',
  styleUrls: ['./teacher-class-quizzes.component.scss']
})
export class TeacherClassQuizzesComponent implements OnInit {

  quizzes: Array<Quiz> = [];
  @Input() classId!: string;
  constructor(private _apiService: OrgAdminServiceService) { }

  ngOnInit(): void {
    this.loadQuizzesForClassroom();
  }

  loadQuizzesForClassroom() {
    this._apiService.getQuizzesForClassroom(this.classId).subscribe(
      (res: any) => {
        this.quizzes = res.data;
        console.log('received quizzes data')
        console.log(this.quizzes)
      },
      (error: any) => {
        console.log(`error loading quizzes for classroom`)
      }
    )
  }

}
