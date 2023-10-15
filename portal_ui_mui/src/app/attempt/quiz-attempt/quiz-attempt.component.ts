import { Component, OnInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz-attempt',
  templateUrl: './quiz-attempt.component.html',
  styleUrls: ['./quiz-attempt.component.scss']
})
export class QuizAttemptComponent implements OnInit {
  quizId: string = "";
  questionId: string = "";
  
  progressSpinnerMode: ProgressSpinnerMode = 'determinate';
  progressValue = 40;

  constructor(private _route: ActivatedRoute) { }
  
  
  ngOnInit(): void {
    this.quizId = this._route.snapshot.params['quiz-id'];
    this.questionId = this._route.snapshot.params['question-id'];
  
    console.log(`quizId : ${this.quizId}`)
    console.log(`questionId : ${this.questionId}`)
  }

  questionSelectClick(){
    console.log(`button click`)
  }

}
