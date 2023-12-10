import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeneralServiceService } from 'src/app/common/service/general-service.service';

@Component({
  selector: 'app-student-quiz-info',
  templateUrl: './student-quiz-info.component.html',
  styleUrls: ['./student-quiz-info.component.scss']
})
export class StudentQuizInfoComponent {
  public quizId: string = '';
  public quizDetails: any = {};
  public singleCorrectQuesCnt: number = 0;
  public multipleCorrectQuesCnt: number = 0;
  public trueFalseQuesCnt: number = 0;


  constructor(public dialogRef: MatDialogRef<StudentQuizInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { quizId: string },
    private _apiService: GeneralServiceService) {
    console.log(data)
    this.quizId = data.quizId;
    this.loadQuizDetails();
  }

  loadQuizDetails() {
    this._apiService.getQuizDetailsWithQuestions(this.quizId).subscribe(
      (res: any) => {
        console.log(res);
        this.quizDetails = res.data;

        this.quizDetails.questionDetails.forEach((ques: any) => {
          if (ques.questionType && ques.questionType === 'SINGLE_CORRECT') {
            this.singleCorrectQuesCnt++;
          } else if (ques.questionType && ques.questionType === 'MULTIPLE_CORRECT') {
            this.multipleCorrectQuesCnt++;
          } else if (ques.questionType && ques.questionType === 'TRUE_FALSE') {
            this.trueFalseQuesCnt++;
          }
        });
        console.log(`single correct : ${this.singleCorrectQuesCnt}, multiple correct : ${this.multipleCorrectQuesCnt}, true false : ${this.trueFalseQuesCnt}`)
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  confirm(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
