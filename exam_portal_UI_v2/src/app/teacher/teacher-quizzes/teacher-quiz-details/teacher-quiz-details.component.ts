import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Question } from "../../../models/question.model";
import { ApiServiceService } from "../../../service/api-service.service";
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-teacher-quiz-details',
  templateUrl: './teacher-quiz-details.component.html',
  styleUrls: ['./teacher-quiz-details.component.css']
})
export class TeacherQuizDetailsComponent implements OnInit {
  quizId: string = '';
  quizDetailTabs = new Map<string, boolean>();
  questions: Array<Question> = [];
  isQuestionAddMode: boolean = false;
  questionForm!: FormGroup;
  selectedIndex: number = 0;

  constructor(private _route: ActivatedRoute, private _apiService: ApiServiceService, private _formbuilder: FormBuilder) {
    this.quizDetailTabs.set('information', true)
    this.quizDetailTabs.set('questions', false)
    this.quizDetailTabs.set('students', false)
    this.quizDetailTabs.set('attempts', false)
    this.quizDetailTabs.set('notification', false)

    this.questionForm = this._formbuilder.group({
      questionText: ['', Validators.required],
      questionType: ['', Validators.required],
      score: ['', Validators.required],
      quizId: ['', Validators.required],
      options: this._formbuilder.array([
        this._formbuilder.group({
          optionText: ['', Validators.required],
          isCorrect: [false, Validators.required],
        })
      ]),
    })
  }

  ngOnInit() {
    this.quizId = this._route.snapshot.paramMap.get('id') as string;
    console.log('passed quiz id  : ' + this.quizId);
  }

  changeTabStatus($event: any, tabName: string) {
    this.removeAndSetDefaultInformationInTab(tabName);
    switch (tabName) {
      case 'information':
        console.log(tabName)
        break
      case 'questions':
        this.loadQuestionForQuiz();
        break
      case 'students':
        console.log(tabName)
        break
      case 'attempts':
        console.log(tabName)
        break
      case 'notification':
        console.log(tabName)
        break
    }
  }

  loadQuestionForQuiz() {
    console.log('loading questions for quiz')
    this._apiService.getQuestionsForQuizWithId(this.quizId).subscribe(
      (res: any) => {
        console.log(res);
        this.questions = res.data;
        console.log(this.questions);
      },
      (error: any) => {
        console.log('error : ' + error);
      }
    )
  }

  removeAndSetDefaultInformationInTab(tabName: string) {
    let tabs = ['information', 'questions', 'students', 'attempts', 'notification'];
    for (let i = 0; i < tabs.length; i++) {
      console.log(tabs[i]);
      console.log(document.getElementById(tabs[i])?.classList)
      if (tabs[i] == tabName) {
        console.log(document.getElementById(tabs[i])?.classList.remove("text-gray-700", "dark:text-white", "hover:border-gray-400"))
        document.getElementById(tabName)?.classList.add("text-blue-600", "border-blue-500", "dark:border-blue-400", "dark:text-blue-300")
        this.quizDetailTabs.set(tabName, true);
      } else {
        this.quizDetailTabs.set(tabs[i], false);
        console.log(document.getElementById(tabs[i])?.classList.remove("text-blue-600", "border-blue-500", "dark:border-blue-400", "dark:text-blue-300"))
      }
    }
  }

  changeQuestionAddMode() {
    this.isQuestionAddMode = !this.isQuestionAddMode;
  }

  get options() {
    return this.questionForm.get('options') as FormArray;
  }

  addOptionForQuestion() {
    let cntOptions = this.options.length;
    console.log('cnt');
    console.log(cntOptions);
    if (((this.questionForm.value.questionType === 'SINGLE_CORRECT' || this.questionForm.value.questionType === 'MULTIPLE_CORRECT') && cntOptions < 5)
      || ((this.questionForm.value.questionType === 'TRUE_FALSE') && cntOptions < 2)) {
      console.log('allowed to add question option');
      this.options.push(
        this._formbuilder.group({
          optionText: ['', Validators.required],
          isCorrect: [false, Validators.required],
        })
      )
    } else {
      console.log('not allowed to add question option max limit reached to 5.')
    }
  }

  removeOption(index: number) {
    this.options.removeAt(index);
  }

  questionFormSubmit() {
    // Handle form submission
    let questionValue: Question = this.questionForm.value;
    if (questionValue.questionType === 'SINGLE_CORRECT' || questionValue.questionType === 'TRUE_FALSE') {
      console.log('handle the single correct or true false');
      questionValue.options.forEach((option: any) => {
        if (option.isCorrect === undefined) {
          option.isCorrect = true;
        }
      });
      console.log(questionValue.options);
    }
    // Multiple correct no need to handle as it will be directly handled
    questionValue.quizId = this.quizId;
    questionValue.createdAt = new Date().toISOString()
    questionValue.updatedAt = new Date().toISOString()
    console.log(questionValue);
    this._apiService.addQuestion(questionValue).subscribe(
      (res: any) => {
        console.log('response received for add Question API : ')
        console.log(res)
        this.questionForm.reset();
        this.isQuestionAddMode = !this.isQuestionAddMode;
        this.loadQuestionForQuiz();
      },
      (error: any) => {
        console.log('error occured while create question API call')
      }
    )
  }

  deleteQuestion(questionId: string | undefined) {
    if (questionId !== undefined) {
      this._apiService.deleteQuestionwithId(questionId).subscribe(
        (res: any) => {
          console.log(res);
          this.loadQuestionForQuiz();
        },
        (error: any) => {
          console.log('delete question failed!!')
        }
      )
    }
    return;
  }

  addQuestion() { }

}
