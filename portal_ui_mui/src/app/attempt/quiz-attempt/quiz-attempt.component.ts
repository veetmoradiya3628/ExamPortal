import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { GeneralServiceService } from 'src/app/common/service/general-service.service';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-quiz-attempt',
  templateUrl: './quiz-attempt.component.html',
  styleUrls: ['./quiz-attempt.component.scss']
})
export class QuizAttemptComponent implements OnInit {
  quizId: string = "";
  quizDetails: any = {};
  questions: Array<Question> = [];
  totalQuestions = 0;
  selectedQuestion: Question = {
    questionText: 'default question text',
    questionType: 'SINGLE_CORRECT',
    score: 0,
    options: []
  };
  selectedQuesitonIndex = 0;

  progressSpinnerMode: ProgressSpinnerMode = 'determinate';
  progressValue = 40;

  constructor(private _route: ActivatedRoute, private _generalApiService: GeneralServiceService) { }

  ngOnInit(): void {
    this.quizId = this._route.snapshot.params['quiz-id'];
    console.log(`quizId : ${this.quizId}`)
    this.getQuizDetailsWithQuestions();
  }

  getQuizDetailsWithQuestions(){
    this._generalApiService.getQuizDetailsWithQuestions(this.quizId).subscribe(
      (res : any) => {
        this.quizDetails = res.data.quizDetails;
        this.questions = res.data.questionDetails;
        this.totalQuestions = this.questions.length;
        this.selectedQuestion = this.questions[0];
        localStorage.setItem('questions', JSON.stringify(this.questions))
        localStorage.setItem('quizDetails', JSON.stringify(this.quizDetails))
        localStorage.setItem('selectedQuestionIndex', "0");
        console.log(this.quizDetails);
        console.log(this.questions);
        console.log(this.selectedQuestion);
      },
      (error : any) => {
        console.log(`Error occured while loading quiz and question details : ${error}`)
      }
    )
  }

  questionSelectClick(_index: number) {
    console.log(`question selected at ${_index}`)
    this.selectedQuestion = this.questions[_index];
    this.selectedQuesitonIndex = _index;
    localStorage.setItem('selectedQuestionIndex', _index.toString());
  }

  nextQuestionClick(){
    this.selectedQuesitonIndex = this.selectedQuesitonIndex + 1;
    this.selectedQuestion = this.questions[this.selectedQuesitonIndex];
    localStorage.setItem('selectedQuestionIndex', this.selectedQuesitonIndex.toString());
  }

  prevQuestionClick(){
    this.selectedQuesitonIndex = this.selectedQuesitonIndex - 1;
    this.selectedQuestion = this.questions[this.selectedQuesitonIndex];
    localStorage.setItem('selectedQuestionIndex', this.selectedQuesitonIndex.toString());
  }

}
