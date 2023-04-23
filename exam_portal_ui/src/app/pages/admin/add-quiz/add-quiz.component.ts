import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories: any = []
  addQuizForm!: FormGroup;

  constructor(private _categoryService: CategoryService, private _utilsService: UtilsService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadCategories();
    this.addQuizForm = this.fb.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      maxMarks: ["", Validators.required],
      numberOfQuestions: ["", Validators.required],
      active: ["", Validators.required],
      category: this.fb.group({
        cid: ["", Validators.required],
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
    console.log(`AddQuiz function call with data: ${this.addQuizForm.value}`);
  }

}
