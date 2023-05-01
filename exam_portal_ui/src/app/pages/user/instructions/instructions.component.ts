import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit{

  qid = 0;
  quiz: any = '';

  constructor(private _route: ActivatedRoute, private _quizService: QuizService){}

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    this._quizService.getSingleQuiz(this.qid).subscribe(
      (data: any) => {
        this.quiz = data;
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

}
