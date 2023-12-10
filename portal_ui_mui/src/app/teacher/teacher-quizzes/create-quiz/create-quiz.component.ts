import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralServiceService } from 'src/app/common/service/general-service.service';
import { UserServiceService } from 'src/app/common/service/user-service.service';
import { Classes } from 'src/app/models/classes.model';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnInit {
  // teacherId from session storage once login implemented
  teacherId: string = '';
  classrooms!: Array<Classes>;
  todayDate!: Date;
  public addQuizForm!: FormGroup;

  constructor(private _apiService: TeacherServiceService,
              private _userService: UserServiceService,
              private _generalService: GeneralServiceService,
              private _router: Router) { }

  ngOnInit(): void {
    this.teacherId = this._userService.getLoggedInUserId();
    this.todayDate = new Date();
    this.addQuizForm = new FormGroup({
      quizTitle: new FormControl('', Validators.required),
      quizDescription: new FormControl('', Validators.required),
      classroomId: new FormControl('', Validators.required),
      isActive: new FormControl(true, Validators.required),
      duration: new FormControl('', Validators.required),
      selectedDate: new FormControl('', Validators.required),
      selectedTime: new FormControl('', Validators.required)
    })
    this.loadClassroomWithUserId();
  }

  loadClassroomWithUserId() {
    this._apiService.getClassroomMappedToUser(this.teacherId).subscribe(
      (res: any) => {
        this.classrooms = res.data;
        console.log(this.classrooms);
      },
      (error: any) => {
        console.log('error occured : ' + error)
      }
    )
  }

  addQuizHandler() {
    console.log(this.addQuizForm.value);
    let reqObject = this.addQuizForm.value;
    console.log(reqObject)
    const [hours, minutes] = reqObject.selectedTime.split(':')
    let startTimeObject = new Date(reqObject.selectedDate)
    startTimeObject.setHours(parseInt(hours, 10))
    startTimeObject.setMinutes(parseInt(minutes, 10))
    reqObject.startTime = startTimeObject.toISOString()

    let endTimeObject = this.addMinutesToDate(startTimeObject, reqObject.duration)
    reqObject.endTime = endTimeObject.toISOString()

    // console.log(`quiz start time : ${this.convertISOToCustomFormat(reqObject.startTime)}`)
    // console.log(`quiz end time : ${this.convertISOToCustomFormat(reqObject.endTime)}`)
    reqObject.questionIds = []
    reqObject.createdAt = new Date().toISOString()
    reqObject.updatedAt = new Date().toISOString()
    reqObject.createdBy = this.teacherId
    reqObject.quizImage = "https://example.com/history-quiz.jpg"
    reqObject.numberOfQuestions = 0
    reqObject.totalMarks = 0

    delete reqObject.selectedDate
    delete reqObject.selectedTime
    
    console.log('final formatted request object for quiz creation --> ')
    console.log(reqObject)
    this._apiService.addQuiz(reqObject).subscribe(
      (res: any) => {
        console.log(res)
        this._router.navigateByUrl('/teacher/quizzes')
        this._generalService.openSnackBar('Quiz created successfully!!', 'Ok')
      },
      (error : any) => {
        console.log(error)
        this._generalService.openSnackBar('Error occured while adding Quiz!!', 'Ok')
      }
    )
  }

  addMinutesToDate(date: Date, minutesToAdd: number): Date {
    return new Date(date.getTime() + minutesToAdd * 60000);
  }

  convertISOToCustomFormat(isoDate: string): string {
    const date = new Date(isoDate);

    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);  // Month is zero-based
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  }
}
