import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { UtilsService } from 'src/app/services/utils.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzez: any = []

  constructor(private _quizService: QuizService, private _utilsService: UtilsService) { }

  ngOnInit(): void {
    this.loadQuiz();
  }

  public loadQuiz() {
    this._quizService.quizzez().subscribe(
      (data: any) => {
        console.log(`Quiz data : ${data}`);
        this.quizzez = data;
      },
      (error: any) => {
        this._utilsService.showSnackBar('Error occured while fetching Quizzes!!', '');
      }
    )
  }

  // delete quiz question
  deleteQuiz(qId: any) {
    console.log(qId);
    Swal.fire({
      icon: 'info',
      title: 'Are you sure?',
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        // go ahead and delete the quiz
        this._quizService.deleteQuiz(qId).subscribe(
          (data: any) => {
            // this.quizzez = this.quizzez.filter((quiz: { qId: any; }) => quiz.qId != qId);
            this._utilsService.showSnackBar('Quiz deleted successfully!!', '');
            this.loadQuiz();
          },
          (error: any) => {
            this._utilsService.showSnackBar('Error occured while deleting Quizzes!!', '');
          }
        )
      }
    })
  }
}
