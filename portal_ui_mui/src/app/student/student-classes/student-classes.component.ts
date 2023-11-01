import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/common/service/user-service.service';
import { Classes } from 'src/app/models/classes.model';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';

@Component({
  selector: 'app-student-classes',
  templateUrl: './student-classes.component.html',
  styleUrls: ['./student-classes.component.scss']
})
export class StudentClassesComponent implements OnInit {
  // studentId from session storage once login implemented
  studentId: string = "";
  classrooms!: Array<Classes>;

  constructor(private _apiService: TeacherServiceService, private _userService: UserServiceService) { }

  ngOnInit(): void {
    this.studentId = this._userService.getLoggedInUserId();
    this.loadClassroomWithUserId();
  }

  loadClassroomWithUserId() {
    this._apiService.getClassroomMappedToUser(this.studentId).subscribe(
      (res: any) => {
        this.classrooms = res.data;
        console.log(this.classrooms);
      },
      (error: any) => {
        console.log('error occured : ' + error)
      }
    )
  }
}
