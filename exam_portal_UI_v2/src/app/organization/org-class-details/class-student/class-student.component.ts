import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user.model';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-class-student',
  templateUrl: './class-student.component.html',
  styleUrls: ['./class-student.component.css']
})
export class ClassStudentComponent implements OnInit {
  orgId: string = "a77f5d7b-c50d-418d-8c66-3814049ca386"; // replace from cookie storage
  isMapStudentMode: boolean = false;
  classroomId: string = "";
  orgStudents: Array<IUser> = [];
  mappedStudents: Array<IUser> = [];
  classUserIds: Array<String> = [];
  isSelectedStudent!: Array<boolean>;

  constructor(private _router: Router, private _apiService: ApiServiceService) {
    this.classroomId = this._router.url.split('/')[3];
  }

  ngOnInit(): void {
    this.getMappedUsersForClassroom();
    this.getUsersForOrganization();
  }

  getMappedUsersForClassroom() {
    this._apiService.getUsersOfClassroomWithRole(this.classroomId, 'STUDENT').subscribe(
      (res: any) => {
        this.mappedStudents = res.data;
        this.classUserIds = [];
        this.mappedStudents.forEach((user) => {
          this.classUserIds.push(user.userId as string);
        })
        this.getUsersForOrganization();
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  getUsersForOrganization() {
    this._apiService.getUsersOfOrganizationByRolename(this.orgId, 'STUDENT').subscribe(
      (res: any) => {
        this.orgStudents = res.data;
        this.filterNotMappedStudentToOrganization();
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  filterNotMappedStudentToOrganization() {
    console.log(this.orgStudents.length);
    this.orgStudents = this.orgStudents.filter(orgUser => !this.classUserIds.includes(orgUser.userId as string))
    console.log(this.orgStudents.length);
    this.isSelectedStudent = new Array<boolean>(this.orgStudents.length).fill(false);
    console.log(this.isSelectedStudent);
  }

  mapSelectedStudentToClassroom(){
    for (let index = 0; index < this.isSelectedStudent.length; index++) {
      if(this.isSelectedStudent[index]){
        let reqObject : any = {};
        reqObject.userId = this.orgStudents[index].userId;
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
    this.getMappedUsersForClassroom();
    this.changeMapMode();
  }

  deleteUserMappingForClassById(userId: string) {
    this._apiService.deleteUserToClassroom(this.classroomId, userId).subscribe(
      (res: any) => {
        console.log(res);
        this.getMappedUsersForClassroom();
        this.getUsersForOrganization();
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  changeisSelectState(idx: number){
    this.isSelectedStudent[idx] = !this.isSelectedStudent[idx];
  }

  changeMapMode() {
    this.isMapStudentMode = !this.isMapStudentMode;
    this.filterNotMappedStudentToOrganization();
  }
}
