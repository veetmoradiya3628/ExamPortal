import { Component, OnInit } from '@angular/core';
import {Quiz} from "../../models/quiz.model";
import {ApiServiceService} from "../../service/api-service.service";
import {Classes} from "../../models/classes.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import * as _ from "lodash";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-teacher-quizzes',
  templateUrl: './teacher-quizzes.component.html',
  styleUrls: ['./teacher-quizzes.component.css']
})
export class TeacherQuizzesComponent implements OnInit{
  // teacherId from session storage once login implemented
  teacherId: string = "08545b03-f586-4d89-8d7d-a78f0a8ed38b";
  quizzes: Array<Quiz> = [];
  classrooms: Array<Classes> = [];
  isAddQuizMode: boolean = false;
  public addQuizForm!: FormGroup;

  constructor(private _apiService: ApiServiceService, private _router: Router, private _route: ActivatedRoute){}

  ngOnInit(): void {
    this.addQuizForm = new FormGroup({
      quizTitle: new FormControl('', Validators.required),
      quizDescription: new FormControl('', Validators.required),
      classroomId: new FormControl('', Validators.required),
      isActive: new FormControl(true, Validators.required),
      startTime: new FormControl('', Validators.required),
      duration: new FormControl('', Validators.required),
      maxAttempts: new FormControl(0, Validators.required)
    })
    this.loadQuizzesForUser();
    this.loadClassroomForUser();
  }

  loadQuizzesForUser(){
    this._apiService.getQuizzesForUser(this.teacherId).subscribe(
      (res: any) => {
        console.log(res);
        this.quizzes = res.data;
        console.log(this.quizzes)
      },
      (error: any) => {
        console.log(error)
      }
    )
  }

  loadClassroomForUser(){
    this._apiService.getClassroomMappedToUser(this.teacherId).subscribe(
      (res: any) => {
        this.classrooms = res.data;
        console.log(this.classrooms);
      },
      (error: any) => {
        console.log(error)
      }
    )
  }

  changeIsAddQuizMode(){
    this.isAddQuizMode = !this.isAddQuizMode
  }

  addQuizFormHandler(){
    if (this.addQuizForm.valid){
      console.log(this.addQuizForm.value);
      let reqObject = this.addQuizForm.value;
      console.log(reqObject);

      reqObject.questionIds = []
      reqObject.createdAt = new Date().toISOString()
      reqObject.updatedAt = new Date().toISOString()
      reqObject.createdBy = this.teacherId
      reqObject.quizImage = "https://example.com/history-quiz.jpg"
      reqObject.numberOfQuestions = 0
      reqObject.totalMarks = 0

      reqObject.startTime = new Date(reqObject.startTime).toISOString()
      console.log('startTime : ' + reqObject.startTime)
      reqObject.endTime = new Date(new Date(reqObject.startTime).getTime() + reqObject.duration * 60 * 1000)
      reqObject.endTime = reqObject.endTime.toISOString()
      console.log('endTime : ' + reqObject.endTime)
      console.log(reqObject);

      this._apiService.addQuiz(reqObject).subscribe(
        (res: any) => {
          console.log(res)
        },
        (error: any) => {
          console.log(error)
        }
      )

    }else{
      console.log('Add Quiz Form Invalid')
      return;
    }
  }

  changeQuizStatus(quizId: string | undefined, status: boolean) {
    this._apiService.changeQuizStatus(quizId, status).subscribe(
      (res: any) => {
        console.log(res)
        this.loadQuizzesForUser()
      },
      (error: any) => {
        console.log(error)
      }
    )
  }

  navigateToDetailPage(id: string | undefined) {
    console.log(id);
    this._router.navigate([`${id}/details`], {relativeTo: this._route});
  }
}
