import { Component, OnInit } from '@angular/core';
import { Classes } from 'src/app/models/classes.model';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';

@Component({
  selector: 'app-teacher-classes',
  templateUrl: './teacher-classes.component.html',
  styleUrls: ['./teacher-classes.component.scss']
})
export class TeacherClassesComponent implements OnInit {
  // teacherId from session storage once login implemented
  teacherId: string = "08545b03-f586-4d89-8d7d-a78f0a8ed38b";
  classrooms!: Array<Classes>;

  constructor(private _apiService: TeacherServiceService){}

  ngOnInit(): void {
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
