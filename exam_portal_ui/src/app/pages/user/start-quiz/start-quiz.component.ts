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

        this.questions.forEach((question: any) => {
          question['givenAnswer'] = '';
        });
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
        this.isSubmit = true;
        this.questions.forEach((ques: any) => {
          if (ques.givenAnswer == ques.answer) {
            this.correctAnswers++;
            let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length;
            this.marksGot += marksSingle;            
          }
          if(ques.givenAnswer.trim() != ''){
            this.attempted++;
          }
        })
        console.log('Correct answers : '+this.correctAnswers);
        console.log('Marks got : '+this.marksGot);
        console.log('Attampted : '+this.attempted);
      }
    })
  }
}
