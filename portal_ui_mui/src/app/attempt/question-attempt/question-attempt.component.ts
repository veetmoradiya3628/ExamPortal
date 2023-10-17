import { Component, Input, OnInit } from '@angular/core';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-question-attempt',
  templateUrl: './question-attempt.component.html',
  styleUrls: ['./question-attempt.component.scss']
})
export class QuestionAttemptComponent implements OnInit {

  public ques!: Question;
  
  @Input()
  set question(question: Question) {
    this.ques = question;
    console.log(this.ques);
  };

  constructor() { 
    // console.log(this.question);
  }
  
  ngOnInit(): void {
  }

}
