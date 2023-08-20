import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Question} from "../../../models/question.model";
import {ApiServiceService} from "../../../service/api-service.service";

@Component({
  selector: 'app-teacher-quiz-details',
  templateUrl: './teacher-quiz-details.component.html',
  styleUrls: ['./teacher-quiz-details.component.css']
})
export class TeacherQuizDetailsComponent implements OnInit{
  quizId: string = '';
  quizDetailTabs = new Map<string, boolean>();
  questions: Array<Question> = [];
  constructor(private _route: ActivatedRoute, private _apiService: ApiServiceService) {
    this.quizDetailTabs.set('information', true)
    this.quizDetailTabs.set('questions', false)
    this.quizDetailTabs.set('students', false)
    this.quizDetailTabs.set('attempts', false)
    this.quizDetailTabs.set('notification', false)
  }

  ngOnInit() {
    this.quizId = this._route.snapshot.paramMap.get('id') as string;
    console.log('passed quiz id  : '+ this.quizId);
  }

  changeTabStatus($event : any, tabName: string){
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
      (error : any) => {
        console.log('error : '+error);
      }
    )
  }

  removeAndSetDefaultInformationInTab(tabName: string){
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
}
