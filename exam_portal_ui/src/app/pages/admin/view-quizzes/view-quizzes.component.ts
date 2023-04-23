import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzez :any = []

  constructor(private _quizService: QuizService, private _utilsService: UtilsService) { }

  ngOnInit(): void {
    this.loadQuiz();
  }

  public loadQuiz(){
    this._quizService.quizzez().subscribe(
      (data: any) => {
        console.log(`Quiz data : ${data}`);
        this.quizzez = data;
      },
      (error : any) => {
        this._utilsService.showSnackBar('Error occured while fetching Quizzes!!','');
      }
    )
  }
}
