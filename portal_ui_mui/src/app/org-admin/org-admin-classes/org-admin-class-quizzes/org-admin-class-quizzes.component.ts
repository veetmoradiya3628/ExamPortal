import { Component, Input, OnInit } from '@angular/core';
import { Quiz } from 'src/app/models/quiz.model';
import { AdminServiceService } from 'src/app/services/admin-service.service';
import { OrgAdminServiceService } from 'src/app/services/org-admin-service.service';

@Component({
  selector: 'app-org-admin-class-quizzes',
  templateUrl: './org-admin-class-quizzes.component.html',
  styleUrls: ['./org-admin-class-quizzes.component.scss']
})
export class OrgAdminClassQuizzesComponent implements OnInit {
  quizzes: Array<Quiz> = [];
  @Input() classId!: string;
  constructor(private _apiService: OrgAdminServiceService) { }

  ngOnInit(): void {
    this.loadQuizzesForClassroom();
  }

  loadQuizzesForClassroom(){
    this._apiService.getQuizzesForClassroom(this.classId).subscribe(
      (res: any) => {
        this.quizzes = res.data;
        console.log('received quizzes data')
        console.log(this.quizzes)
      },
      (error : any) => {
        console.log(`error loading quizzes for classroom`)
      }
    )
  }
}
