import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralServiceService } from 'src/app/common/service/general-service.service';
import { UserServiceService } from 'src/app/common/service/user-service.service';
import { Quiz } from 'src/app/models/quiz.model';
import { StudentServiceService } from 'src/app/services/student-service.service';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';
import { StudentQuizInfoComponent } from './student-quiz-info/student-quiz-info.component';
import { DeleteModelServiceService } from 'src/app/common/delete-model-service.service';

@Component({
  selector: 'app-student-quizzes',
  templateUrl: './student-quizzes.component.html',
  styleUrls: ['./student-quizzes.component.scss']
})
export class StudentQuizzesComponent implements OnInit {

  // studentId from session storage once login implemented
  studentId: string = '';
  quizzes: Array<Quiz> = [];

  constructor(private _apiService: TeacherServiceService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserServiceService,
    private _studentApiService: StudentServiceService,
    private _generalService: GeneralServiceService,
    private dialog: MatDialog,
    private _confirmDialog: DeleteModelServiceService
  ) { }

  ngOnInit(): void {
    this.studentId = this._userService.getLoggedInUserId();
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
    const dialogRef = this.dialog.open(StudentQuizInfoComponent, {
      data: {quizId}
    });

    return dialogRef.afterClosed().toPromise().then((result) => result === true)
  }

  attemptQuiz(quiz: Quiz) {
    this._confirmDialog.openConfirmationDialog('Are you sure want to start quiz attempt ?').then((result) => {
      if(result){
        this.startQuizAttempt(quiz);
      }else{
        // user cancel the action
        return;
      }
    })
  }

  startQuizAttempt(quiz: Quiz){
    console.log(`quiz trying to attempt : ${quiz}`)
    let reqObj: any = {}
    reqObj['quizId'] = quiz.id;
    reqObj['userId'] = this.studentId;
    console.log(`start quiz req object ${reqObj}`)
    this._studentApiService.startQuiz(reqObj).subscribe(
      (res: any) => {
        console.log(res);
        let quizAttemptId = res.data.quizAttemptId;
        console.log(quizAttemptId);
        localStorage.setItem('quizAttempt', JSON.stringify(res.data));
        localStorage.setItem('quizAttemptId', quizAttemptId);
        this.enterFullScreenOnInit();
        this._router.navigateByUrl(`/quiz-attempt/${quiz.id}/question`)
        this._generalService.openSnackBar('Quiz attempt started successfully!!', 'Ok')
      },
      (error: any) => {
        console.log(`error occured in starting quiz`)
        this._generalService.openSnackBar('Error occured in starting quiz!!', 'Ok')
        return;
      }
    )
  }

  enterFullScreenOnInit() {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen().then(() => {
        console.log('full screen mode!')
      }, () => {
        console.log('error in full screen mode')
      })
    }
  }
}
