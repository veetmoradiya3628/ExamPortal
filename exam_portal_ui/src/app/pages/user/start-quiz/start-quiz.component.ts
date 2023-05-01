import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {
  qid = 0;
  questions: any;

  constructor(private _route: ActivatedRoute, private _locationStrategy: LocationStrategy, private _questionService: QuestionService){}
  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    this.preventBackButton();
    this.loadQuestions();
  }

  preventBackButton(){
    history.pushState(null, null, location.href);
    this._locationStrategy.onPopState(() => {
      history.pushState(null, null, location.href);
    })
  }

  loadQuestions(){
    this._questionService.getQuestionOfQuizForTest(this.qid).subscribe(
      (data: any) => {
        this.questions = data;
      },
      (error: any) => {
        Swal.fire('Error', 'Error in loading Question of Quiz', 'error');
      }
    )
  }

}
