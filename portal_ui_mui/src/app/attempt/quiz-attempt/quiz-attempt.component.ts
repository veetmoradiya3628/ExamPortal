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
  listOfAttemptedQuestions: Array<number> = [];
  questionClassroom: Array<string> = [];
  attemptedQuestionCnt: number = 0;

  progressSpinnerMode: ProgressSpinnerMode = 'determinate';
  progressValue = 40;

  constructor(private _route: ActivatedRoute, private _generalApiService: GeneralServiceService) { }

  ngOnInit(): void {
    this.quizId = this._route.snapshot.params['quiz-id'];
    console.log(`quizId : ${this.quizId}`)
    this.getQuizDetailsWithQuestions();

    setInterval(() => {
      this.updateAttemptedQuestionStyle();
    }, 2000)
  }

  getQuizDetailsWithQuestions() {
    this._generalApiService.getQuizDetailsWithQuestions(this.quizId).subscribe(
      (res: any) => {
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
        // visistedOptions = [];
        // attemptedOptions = [];
      },
      (error: any) => {
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

  nextQuestionClick() {
    this.selectedQuesitonIndex = this.selectedQuesitonIndex + 1;
    this.selectedQuestion = this.questions[this.selectedQuesitonIndex];
    localStorage.setItem('selectedQuestionIndex', this.selectedQuesitonIndex.toString());
  }

  prevQuestionClick() {
    this.selectedQuesitonIndex = this.selectedQuesitonIndex - 1;
    this.selectedQuestion = this.questions[this.selectedQuesitonIndex];
    localStorage.setItem('selectedQuestionIndex', this.selectedQuesitonIndex.toString());
  }

  updateAttemptedQuestionStyle() {
    console.log(`function update style called`)
    if (this.questionClassroom.length === 0) {
      for (let index = 0; index < this.questions.length; index++) {
        this.questionClassroom.push("question-logo normal-question");
      }
    }
    let cntOfAttemptedQues = 0;
    for (let index = 0; index < this.questions.length; index++) {
      if(localStorage.getItem(index.toString()) !== null){
        cntOfAttemptedQues++;
        if(!this.questionClassroom[index].includes("attempted-question-circle")){
          this.questionClassroom[index] = this.questionClassroom[index] + ' attempted-question-circle';
        }
      }
    }
    this.attemptedQuestionCnt = cntOfAttemptedQues;
  }

}
