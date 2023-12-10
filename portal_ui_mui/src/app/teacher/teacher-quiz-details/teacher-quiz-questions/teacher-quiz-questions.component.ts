import { AfterViewInit, Component, Inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/models/question.model';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';

@Component({
  selector: 'app-teacher-quiz-questions',
  templateUrl: './teacher-quiz-questions.component.html',
  styleUrls: ['./teacher-quiz-questions.component.scss']
})
export class TeacherQuizQuestionsComponent implements OnInit {

  questions: Array<Question> = [];
  @Input() quizId!: string;

  constructor(private _apiService: TeacherServiceService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.loadQuestionForQuiz();
  }

  loadQuestionForQuiz() {
    console.log('loading questions for quiz')
    this._apiService.getQuestionsForQuizWithId(this.quizId).subscribe(
      (res: any) => {
        console.log(res);
        this.questions = res.data;
        console.log(this.questions);
      },
      (error: any) => {
        console.log('error : ' + error);
      }
    )
  }

  createQuestion() {
    this.router.navigate(['../add-question'], { relativeTo: this.route });
  }


  openDeleteQuestionConfirmDialog(questionId: string | undefined) {
    console.log(`delete question called with id: ${questionId}`)
    const dialogRef = this.dialog.open(deleteQuestionConfirmDialog, { data: questionId });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result : ${result}`)
      this.loadQuestionForQuiz();
    })

  }

}


@Component({
  selector: 'delete-question-confirm-dialog',
  templateUrl: 'delete-question-confirm.html',
  standalone: true,
  imports: [MatDialogModule, MatIconModule, MatButtonModule, MatTableModule, MatSlideToggleModule, MatCheckboxModule],
})
export class deleteQuestionConfirmDialog implements OnInit {

  constructor(private _apiService: TeacherServiceService,
    private _route: ActivatedRoute,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public questionId: string) { }

  ngOnInit(): void {
    console.log(`dialog received questionId: ${this.questionId}`)
  }

  deleteQuestion() {
    this._apiService.deleteQuestionwithId(this.questionId).subscribe(
      (res: any) => {
        console.log(res)
      },
      (error: any) => {
        console.log(`error in deleting data`)
      }
    )
  }
}