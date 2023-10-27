import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from 'src/app/models/quiz.model';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';

@Component({
  selector: 'app-student-quizzes',
  templateUrl: './student-quizzes.component.html',
  styleUrls: ['./student-quizzes.component.scss']
})
export class StudentQuizzesComponent implements OnInit {

  // studentId from session storage once login implemented
  studentId: string = "a593ee93-d357-4d16-8fff-f09c4214e5c1";
  quizzes: Array<Quiz> = [];

  constructor(private _apiService: TeacherServiceService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadQuizzesForUser();
  }

  loadQuizzesForUser() {
    this._apiService.getQuizzesForUser(this.studentId).subscribe(
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
    console.log(`View Quiz button clicked with ${quizId}`)
  }

  attemptQuiz(quiz: Quiz) {
    console.log(`quiz trying to attempt : ${quiz}`)
    this.enterFullScreenOnInit();
    this._router.navigateByUrl(`/quiz-attempt/${quiz.id}/question`)
  }

  enterFullScreenOnInit(){
    const element = document.documentElement;
    if(element.requestFullscreen){
      element.requestFullscreen().then(() => {
        console.log('full screen mode!')
      }, () => {
        console.log('error in full screen mode')
      })
    }
  }
}
