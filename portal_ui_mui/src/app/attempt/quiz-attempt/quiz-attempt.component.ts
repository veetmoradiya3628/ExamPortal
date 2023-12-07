import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteModelServiceService } from 'src/app/common/delete-model-service.service';
import { GeneralServiceService } from 'src/app/common/service/general-service.service';
import { UserServiceService } from 'src/app/common/service/user-service.service';
import { Question } from 'src/app/models/question.model';
import { QuestionAttemptDto } from 'src/app/models/question_attempt_dto.model';
import { StudentServiceService } from 'src/app/services/student-service.service';

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
  selectedQuestionIndex = 0;
  listOfAttemptedQuestions: Array<number> = [];
  questionClassroom: Array<string> = [];
  attemptedQuestionCnt: number = 0;

  startTime: Date = new Date();
  endTime: Date = new Date();
  timeDiff: number = 0;
  timeDiffInFormat: string = '';
  totalTimeDiff: number = 0;

  progressSpinnerMode: ProgressSpinnerMode = 'determinate';
  progressValue = 40;
  submitQuestionInteval: any;
  timeDiffInteval: any;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _generalApiService: GeneralServiceService,
    private cdr: ChangeDetectorRef,
    private _userService: UserServiceService,
    private _studentApiService: StudentServiceService,
    private _dialogService: DeleteModelServiceService) { }

  ngOnInit(): void {
    this.quizId = this._route.snapshot.params['quiz-id'];
    console.log(`quizId : ${this.quizId}`)
    this.getQuizDetailsWithQuestions()
    this.timeDiffInteval = setInterval(() => {
      this.updateAttemptedQuestionStyle();
    }, 2000)
    this.submitQuestionInteval = setInterval(() => {
      this.submitAttemptedQuestions()
    }, 10000)
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
        this.startQuizTimerSetup();
        // visistedOptions = [];
        // attemptedOptions = [];
      },
      (error: any) => {
        console.log(`Error occured while loading quiz and question details : ${error}`)
      }
    )
  }

  startQuizTimerSetup() {
    this.startTime = new Date(this.quizDetails.startTime);
    this.endTime = new Date(this.quizDetails.endTime);
    this.timeDiff = this.endTime.getTime() - this.startTime.getTime();
    // this.timeDiff = (0.2 * 60 * 1000);
    this.totalTimeDiff = this.timeDiff;

    let timerInteval = setInterval(() => {
      console.log('timediff calc called')
      if (this.timeDiff === 0) {
        clearInterval(timerInteval);
        // auto submit quiz should trigger
      }
      this.timeDiff = this.timeDiff - 1000;
      console.log(this.timeDiff);
      this.progressValue = (this.timeDiff / this.totalTimeDiff) * 100;
      this.timeDiffInFormat = this.msToTime(this.timeDiff);
      this.cdr.detectChanges();
    }, 1000)
  }

  questionSelectClick(_index: number) {
    console.log(`question selected at ${_index}`)
    this.selectedQuestion = this.questions[_index];
    this.selectedQuestionIndex = _index;
    localStorage.setItem('selectedQuestionIndex', _index.toString());
  }

  nextQuestionClick() {
    this.selectedQuestionIndex = this.selectedQuestionIndex + 1;
    this.selectedQuestion = this.questions[this.selectedQuestionIndex];
    localStorage.setItem('selectedQuestionIndex', this.selectedQuestionIndex.toString());
  }

  prevQuestionClick() {
    this.selectedQuestionIndex = this.selectedQuestionIndex - 1;
    this.selectedQuestion = this.questions[this.selectedQuestionIndex];
    localStorage.setItem('selectedQuestionIndex', this.selectedQuestionIndex.toString());
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
      if (localStorage.getItem(index.toString()) !== null) {
        cntOfAttemptedQues++;
        if (!this.questionClassroom[index].includes("attempted-question-circle")) {
          this.questionClassroom[index] = this.questionClassroom[index] + ' attempted-question-circle';
        }
      }
    }
    this.attemptedQuestionCnt = cntOfAttemptedQues;
  }

  msToTime(duration: number) {
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    return `${hours}h ${minutes}m ${seconds}s`;
  }

  endQuiz(){
    this._dialogService.openConfirmationDialog('Are you sure want to submit the quiz ?').then((result) => {
      if(result){
        this.submitAttemptedQuestions();
        clearInterval(this.submitQuestionInteval);
        clearInterval(this.timeDiffInteval);
        let requestObj = {
          quizAttemptId: localStorage.getItem('quizAttemptId' || '')
        }
        this._studentApiService.endQuiz(requestObj).subscribe(
          (res : any) => {
            console.log(res);
            for (let index = 0; index < this.questions.length; index++) {
              localStorage.removeItem(index.toString())              
            }
            localStorage.removeItem('selectedQuestionIndex')
            localStorage.removeItem('questions')
            localStorage.removeItem('quizAttemptId')
            localStorage.removeItem('quizDetails')
            localStorage.removeItem('quizAttempt')
            this._router.navigateByUrl('/student/quizzes')
            this._generalApiService.openSnackBar('quiz attempted successfully!!!', 'Ok')
          },
          (error : any) => {
            console.log('error')
            this._generalApiService.openSnackBar('Error while submitting quiz!!', 'Ok') 
          }
        )
      }else{
        // user cancel the action
        return;
      }
    })
  }

  submitAttemptedQuestions() {
    console.log(`submit attempted question function called!!`)
    for (let index = 0; index < this.questions.length; index++) {
      if (localStorage.getItem(index.toString()) !== null) {
        console.log(`attempted question found for index : ${index}`)
        let userId = this._userService.getLoggedInUserId();
 
        // to make it work for submit question req body
        let question = this.questions[index];
        question.id = question.questionId;
        delete question.updatedAt;
        let attemptReqObject: QuestionAttemptDto = {
          question: question,
          quizAttemptId: localStorage.getItem('quizAttemptId') as string,
          userId: userId,
          selectedOptions: JSON.parse(localStorage.getItem(index.toString()) || '{}')
        }
        console.log(attemptReqObject)
        this._studentApiService.submitQuestion(this.questions[index].questionId, userId, attemptReqObject).subscribe(
          (res: any) => {
            console.log(res);
            console.log('question submitted successfully!!!');
          },
          (error: any) => {
            console.log(`error occured while submitting question`);
          }
        )
      }
    }
  }
}
