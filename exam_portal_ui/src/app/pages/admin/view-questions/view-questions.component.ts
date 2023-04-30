import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {
  qId = 0;
  qTitle = '';
  questions: any = [];

  constructor(private _route: ActivatedRoute, private _questionService: QuestionService, private _utilsService: UtilsService){}
  ngOnInit(): void {
    this.qId = this._route.snapshot.params['id'];
    this.qTitle = this._route.snapshot.params['title'];
    console.log('qid : '+this.qId);
    console.log('qtitle : '+this.qTitle);
    this._questionService.getQuestionsofQuiz(this.qId).subscribe(
      (data) => {
        console.log(data);
        this.questions = data;
      },
      (error) => {
        this._utilsService.showSnackBar('Error occured while fetching question for quiz!!','');
      }
    )
  }

}
