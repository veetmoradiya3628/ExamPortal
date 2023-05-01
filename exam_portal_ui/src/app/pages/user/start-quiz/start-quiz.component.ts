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

  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;
  isSubmit = false;
  timer: any;


  constructor(private _route: ActivatedRoute, private _locationStrategy: LocationStrategy, private _questionService: QuestionService) { }

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    this.preventBackButton();
    this.loadQuestions();
  }

  preventBackButton() {
    history.pushState(null, 'null', location.href);
    this._locationStrategy.onPopState(() => {
      history.pushState(null, 'null', location.href);
    })
  }

  loadQuestions() {
    this._questionService.getQuestionOfQuizForTest(this.qid).subscribe(
      (data: any) => {
        this.questions = data;
        this.timer = this.questions.length * 2 * 60;
        // this.questions.forEach((question: any) => {
        //   question['givenAnswer'] = '';
        // });
        this.startTimer();
        console.log(`Question data on quiz is : `);
        console.log(this.questions);
      },
      (error: any) => {
        Swal.fire('Error', 'Error in loading Question of Quiz', 'error');
      }
    )
  }


  submitQuiz() {
    Swal.fire({
      title: 'Do you want to end the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: 'info'
    }).then((result) => {
      if (result.isConfirmed) {
        // calculation
        this.evalQuiz();
      }
    })
  }

  evalQuiz() {
    // this.isSubmit = true;
    // this.questions.forEach((ques: any) => {
    //   if (ques.givenAnswer == ques.answer) {
    //     this.correctAnswers++;
    //     let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length;
    //     this.marksGot += marksSingle;
    //   }
    //   if (ques.givenAnswer.trim() != '') {
    //     this.attempted++;
    //   }
    // })
    // console.log('Correct answers : ' + this.correctAnswers);
    // console.log('Marks got : ' + this.marksGot);
    // console.log('Attampted : ' + this.attempted);

    // server code for evaluation
    this._questionService.evalQuiz(this.questions).subscribe(
      (data: any) => {
        console.log(data);
        this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
        this.correctAnswers = data.correctAnswers;
        this.attempted = data.attempted;
        this.isSubmit = true;
      },
      (error: any) => {
        console.log('Error'+error);
      }
    )
  }

  startTimer() {
    let t: any = window.setInterval(() => {
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000)
  }


  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - (mm * 60)
    return `${mm} min : ${ss} sec`
  }
  
  printPage(){
    window.print();
  }
}
