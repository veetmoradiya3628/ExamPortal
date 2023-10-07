import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from 'src/app/models/quiz.model';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';

@Component({
  selector: 'app-teacher-quizzes',
  templateUrl: './teacher-quizzes.component.html',
  styleUrls: ['./teacher-quizzes.component.scss']
})
export class TeacherQuizzesComponent implements OnInit {

  // teacherId from session storage once login implemented
  teacherId: string = "08545b03-f586-4d89-8d7d-a78f0a8ed38b";
  quizzes: Array<Quiz> = [];

  constructor(private _apiService: TeacherServiceService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadQuizzesForUser();
  }

  loadQuizzesForUser() {
    this._apiService.getQuizzesForUser(this.teacherId).subscribe(
      (res: any) => {
        console.log(res);
        this.quizzes = res.data;
        console.log(this.quizzes)
      },
      (error: any) => {
        console.log(error)
      }
    )
  }

  onClickViewQuizDetails(quizId: string | undefined) {
    console.log(`received quizId ${quizId}`);
    this._router.navigate([`${quizId}/details`], { relativeTo: this._route });
  }

}
