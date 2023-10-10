import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Classes } from 'src/app/models/classes.model';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent implements OnInit {
  // teacherId from session storage once login implemented
  teacherId: string = "08545b03-f586-4d89-8d7d-a78f0a8ed38b";
  classrooms!: Array<Classes>;
  todayDate!: Date;
  public addQuizForm!: FormGroup;

  constructor(private _apiService: TeacherServiceService) { }

  ngOnInit(): void {
    this.todayDate = new Date();
    this.addQuizForm = new FormGroup({
      quizTitle: new FormControl('', Validators.required),
      quizDescription: new FormControl('', Validators.required),
      classroomId: new FormControl('', Validators.required),
      isActive: new FormControl(true, Validators.required),
      startTime: new FormControl('', Validators.required),
      duration: new FormControl('', Validators.required),
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

  addQuestionHandler(){
    console.log(this.addQuizForm.value);
  }
}
