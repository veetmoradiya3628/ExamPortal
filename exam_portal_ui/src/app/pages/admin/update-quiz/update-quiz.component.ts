import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import { UtilsService } from 'src/app/services/utils.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {
  qId = -1;
  categories: any = [];
  updateQuizForm!: FormGroup;

  constructor(private _route: ActivatedRoute,
    private _quizService: QuizService,
    private _categoryService: CategoryService,
    private _utilsService: UtilsService,
    private _router: Router) { }

  ngOnInit(): void {
    this.updateQuizForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      maxMarks: new FormControl('', Validators.required),
      numberOfQuestions: new FormControl('', Validators.required),
      active: new FormControl('', Validators.required),
      category: new FormGroup({
        cid: new FormControl('', Validators.required)
      })
    })
    this.loadCategories();
    this.qId = this._route.snapshot.params['qid'];
    this._quizService.getSingleQuiz(this.qId).subscribe(
      (data: any) => {
        this.updateQuizForm.patchValue({
          title: data.title,
          description: data.description,
          maxMarks: data.maxMarks,
          numberOfQuestions: data.numberOfQuestions,
          active: data.active,
        });
      },
      (error: any) => {
        console.error('Error while fetching data for 1 quiz');
      }
    );
  }

  // update quiz
  updateQuiz() {
    let updateQuizObj = this.updateQuizForm.value;
    updateQuizObj['qid'] = this.qId;
    this._quizService.updateQuiz(updateQuizObj).subscribe(
      (data: any) => {
        Swal.fire('Success!!', 'Quiz updated', 'success').then((e) => {
          this._router.navigate(['/admin/quizzes']);
        })
      },
      (error: any) => {
        Swal.fire('Error', 'Error in updating Quiz', 'error');
      }
    )
  }


  loadCategories() {
    this._categoryService.categories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error: any) => {
        this._utilsService.showSnackBar('Error occured while fetching category!!', '');
      }
    )
  }


}
