import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { UtilsService } from 'src/app/services/utils.service';
import Swal from 'sweetalert2';

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

  // delete question
  deleteQuestion(questionId: any){
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are you sure want to delete this question ?',
    }).then((result) => {
      if(result.isConfirmed){
        this._questionService.deleteQuestion(questionId).subscribe(
          (data: any) => {
            this._utilsService.showSnackBar('Question deleted successfully!!','');
            this.questions = this.questions.filter((q : any) => q.quesId !== questionId)
          },
          (error: any) => {
            this._utilsService.showSnackBar('Error occured while deleting question of the quiz!!','');
          }
        )
      }
    })
  }
}
