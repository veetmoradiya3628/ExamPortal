import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {
  catId: any = ''
  quizzes: any = ''
  
  constructor(private _route: ActivatedRoute,
              private _quizService: QuizService){}

  ngOnInit(): void {

    this._route.params.subscribe((params)=>{
      this.catId = params['catId'];

      console.log(this.catId);
      if(this.catId == 0){
        console.log('Load all the quiz');
        this._quizService.getActiveQuizzes().subscribe(
          (data: any) => {
            this.quizzes = data;
          },
          (error: any) => {
            alert('error in loading a quiz data')
          }
        )
      }else{
        this._quizService.getActiveQuizzesOfCategory(this.catId).subscribe(
          (data: any) => {
            this.quizzes = data;
          },
          (error: any) => {
            alert('error in loading a quiz from category')
          }
        )
      }
    })

  }

}
