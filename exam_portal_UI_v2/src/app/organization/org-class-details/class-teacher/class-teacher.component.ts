import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user.model';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-class-teacher',
  templateUrl: './class-teacher.component.html',
  styleUrls: ['./class-teacher.component.css']
})
export class ClassTeacherComponent implements OnInit {
  orgId: string = "a77f5d7b-c50d-418d-8c66-3814049ca386"; // replace from cookie storage
  isMapTeacherMode: boolean = false;
  classroomId: string = "";
  orgTeachers: Array<IUser> = [];
  mappedTeachers: Array<IUser> = [];
  classTeacherIds: Array<String> = [];
  isSelectedTeacher!: Array<boolean>;

  constructor(private _router: Router, private _apiService: ApiServiceService) {
    this.classroomId = this._router.url.split('/')[3];
  }

  ngOnInit(): void {
    this.getMappedTeachersForClassroom();
    this.getTeachersForOrganization();
  }

  getMappedTeachersForClassroom() {
    this._apiService.getUsersOfClassroomWithRole(this.classroomId, 'TEACHER').subscribe(
      (res: any) => {
        this.mappedTeachers = res.data;
        this.classTeacherIds = [];
        this.mappedTeachers.forEach((teacher) => {
          this.classTeacherIds.push(teacher.userId as string);
        })
        this.getTeachersForOrganization();
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  getTeachersForOrganization() {
    this._apiService.getUsersOfOrganizationByRolename(this.orgId, 'TEACHER').subscribe(
      (res: any) => {
        this.orgTeachers = res.data;
        this.filterNotMappedTeacherToOrganization();
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  filterNotMappedTeacherToOrganization() {
    console.log(this.orgTeachers.length);
    this.orgTeachers = this.orgTeachers.filter(orgTeacher => !this.classTeacherIds.includes(orgTeacher.userId as string))
    console.log(this.orgTeachers.length);
    this.isSelectedTeacher = new Array<boolean>(this.orgTeachers.length).fill(false);
    console.log(this.isSelectedTeacher);
  }

  mapSelectedTeacherToClassroom() {
    for (let index = 0; index < this.isSelectedTeacher.length; index++) {
      if (this.isSelectedTeacher[index]) {
        let reqObject: any = {};
        reqObject.userId = this.orgTeachers[index].userId;
        reqObject.classroomId = this.classroomId;
        console.log(reqObject);
        this._apiService.mapUserToClassroom(reqObject).subscribe(
          (res: any) => {
            console.log(res);
          },
          (error: any) => {
            console.log(error);
          }
        )
      }
    }
    this.getMappedTeachersForClassroom();
    this.changeMapMode();
  }

  deleteUserMappingForClassById(userId: string) {
    this._apiService.deleteUserToClassroom(this.classroomId, userId).subscribe(
      (res: any) => {
        console.log(res);
        this.getMappedTeachersForClassroom();
        this.getTeachersForOrganization();
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  changeisSelectState(idx: number) {
    this.isSelectedTeacher[idx] = !this.isSelectedTeacher[idx];
  }

  changeMapMode() {
    this.isMapTeacherMode = !this.isMapTeacherMode;
    this.filterNotMappedTeacherToOrganization();
  }
}
