import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/common/service/user-service.service';
import { Classes } from 'src/app/models/classes.model';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';

@Component({
  selector: 'app-teacher-classes',
  templateUrl: './teacher-classes.component.html',
  styleUrls: ['./teacher-classes.component.scss']
})
export class TeacherClassesComponent implements OnInit {
  // teacherId from session storage once login implemented
  teacherId: string = "";
  classrooms!: Array<Classes>;

  constructor(private _apiService: TeacherServiceService, private _userService: UserServiceService){}

  ngOnInit(): void {
    this.teacherId = this._userService.getLoggedInUserId();
    this.loadClassroomWithUserId();
  }

  loadClassroomWithUserId(){
    this._apiService.getClassroomMappedToUser(this.teacherId).subscribe(
      (res: any) => {
        this.classrooms = res.data;
        console.log(this.classrooms);
      },
      (error: any) => {
        console.log('error occured : '+error)
      }
    )
  }

}
