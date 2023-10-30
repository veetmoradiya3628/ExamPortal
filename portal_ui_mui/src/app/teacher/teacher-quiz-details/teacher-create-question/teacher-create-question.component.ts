import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralServiceService } from 'src/app/common/service/general-service.service';
import { Question } from 'src/app/models/question.model';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';

@Component({
  selector: 'app-teacher-create-question',
  templateUrl: './teacher-create-question.component.html',
  styleUrls: ['./teacher-create-question.component.scss']
})
export class TeacherCreateQuestionComponent implements OnInit {
  quizId: string = '';
  questionForm!: FormGroup;
  selectedOptionIndex!: number;

  constructor(private _router: Router, private _formbuilder: FormBuilder, private _route: ActivatedRoute, private _apiService: TeacherServiceService, private _generalService: GeneralServiceService) {
    this.quizId = this._route.snapshot.paramMap.get('id') as string;
    console.log('passed quiz id  : ' + this.quizId);

    this.questionForm = this._formbuilder.group({
      questionText: ['', Validators.required],
      questionType: ['SINGLE_CORRECT', Validators.required],
      score: ['', Validators.required],
      quizId: [this.quizId, Validators.required],
      options: this._formbuilder.array([
        this._formbuilder.group({
          optionText: [''],
          isCorrect: [false],
        }),
        this._formbuilder.group({
          optionText: [''],
          isCorrect: [false],
        }),
        this._formbuilder.group({
          optionText: [''],
          isCorrect: [false],
        }),
        this._formbuilder.group({
          optionText: [''],
          isCorrect: [false],
        }),
        this._formbuilder.group({
          optionText: [''],
          isCorrect: [false],
        })
      ]),
    })

    this.questionForm.get('options')?.get('0')?.valueChanges.subscribe(() => {
      this.selectedOptionIndex = 0;
    })
    this.questionForm.get('options')?.get('1')?.valueChanges.subscribe(() => {
      this.selectedOptionIndex = 1;
    })
    this.questionForm.get('options')?.get('2')?.valueChanges.subscribe(() => {
      this.selectedOptionIndex = 2;
    })
    this.questionForm.get('options')?.get('3')?.valueChanges.subscribe(() => {
      this.selectedOptionIndex = 3;
    })
    this.questionForm.get('options')?.get('4')?.valueChanges.subscribe(() => {
      this.selectedOptionIndex = 4;
    })
  }

  get options() {
    return this.questionForm.get('options') as FormArray;
  }

  ngOnInit(): void {
  }

  getQuestionOptions() {
    if (this.questionForm.value['questionType'] === 'TRUE_FALSE') {
      return this.options.controls.slice(0, 2);
    }
    return this.options.controls;
  }

  addQuestionHandler() {
    console.log(`Add Question form called`)
    console.log(this.questionForm)
    if (this.questionForm.valid || this.questionForm.value.questionType === 'TRUE_FALSE') {
      let formValue = this.questionForm.value;
      if (formValue.questionType === 'SINGLE_CORRECT' || formValue.questionType === 'TRUE_FALSE') {
        for (let index = 0; index < formValue.options.length; index++) {
          if (index === this.selectedOptionIndex) {
            formValue.options[index].isCorrect = true;
          } else {
            formValue.options[index].isCorrect = false;
          }
        }
        if (formValue.questionType === 'TRUE_FALSE') {
          formValue.options.splice(formValue.options.length - 3)
        }
      }
      let requestObject: Question = formValue;
      requestObject.createdAt = new Date().toISOString()
      requestObject.updatedAt = new Date().toISOString()
      console.log(`final formatted requestObject :`);
      console.log(requestObject);
      this._apiService.addQuestion(requestObject).subscribe(
        (res: any) => {
          console.log(res);
          this._generalService.openSnackBar('Question created successfully!!', 'Ok')
          this._router.navigate([`../../${this.quizId}/details`], { relativeTo: this._route });
        },
        (error: any) => {
          this._generalService.openSnackBar('Error occured while creating a question!!', 'Ok')
          console.log(`Error while adding question ${error}`)
        }
      )
    }
  }

  cancelQuestionCreation() {
    this._router.navigateByUrl('/teacher/quizzes/' + this.quizId + '/details')
  }

}
