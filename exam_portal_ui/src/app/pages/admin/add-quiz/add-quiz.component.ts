import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories: any = []
  addQuizForm!: FormGroup;

  constructor(private _categoryService: CategoryService, 
              private _utilsService: UtilsService, 
              private _quizService: QuizService) { }

  ngOnInit(): void {
    this.loadCategories();
    this.addQuizForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      maxMarks: new FormControl('', Validators.required),
      numberOfQuestions: new FormControl('', Validators.required),
      active: new FormControl('', Validators.required),
      category: new FormGroup({
        cid: new FormControl('', Validators.required)
      })
    })
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

  addQuiz() {
    console.log(`AddQuiz function call with data`);
    console.log(this.addQuizForm.value);
    if(this.addQuizForm.valid){
      this._quizService.addQuiz(this.addQuizForm.value).subscribe(
        (data: any) => {
          this._utilsService.showSnackBar('Quiz Added successfully', 'Ok');
          this.addQuizForm.reset();
        },
        (error: any) => {
          this._utilsService.showSnackBar('Error occured while adding quiz data :(', 'Ok');
        }
      )
    }
  }

}
