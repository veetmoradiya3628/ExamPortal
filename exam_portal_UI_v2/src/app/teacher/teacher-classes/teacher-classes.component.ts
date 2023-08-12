import { Component, OnInit } from '@angular/core';
import { Classes } from 'src/app/models/classes.model';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-teacher-classes',
  templateUrl: './teacher-classes.component.html',
  styleUrls: ['./teacher-classes.component.css']
})
export class TeacherClassesComponent implements OnInit {

  // this will be dynamic once we make authentication flow & teacher admin login
  teacherId: string = '08545b03-f586-4d89-8d7d-a78f0a8ed38b';
  classes!: Array<Classes>;
  
  constructor(private _apiService: ApiServiceService){}

  ngOnInit(): void {
    this.loadClassroomWithUserId();
  }

  loadClassroomWithUserId()
  {
    this._apiService.getClassroomMappedToUser(this.teacherId).subscribe(
      (res: any) => {
        this.classes = res.data;
        console.log(this.classes);
      },
      (error: any) => {
        console.log('error occured : '+error)
      }
    )
  }

}
