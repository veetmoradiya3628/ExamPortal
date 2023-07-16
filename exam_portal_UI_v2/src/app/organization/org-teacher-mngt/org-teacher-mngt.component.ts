import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-org-teacher-mngt',
  templateUrl: './org-teacher-mngt.component.html',
  styleUrls: ['./org-teacher-mngt.component.css']
})
export class OrgTeacherMngtComponent implements OnInit {

  // this will be dynamic once we make authentication flow & org admin login
  orgId: string = 'a77f5d7b-c50d-418d-8c66-3814049ca386';
  users: Array<any> = new Array<any>();

  constructor(private apiService: ApiServiceService, private router: Router) { }

  ngOnInit(): void {
    this.loadTeacherForOrganization();
  }

  loadTeacherForOrganization() {
    this.apiService.getUsersOfOrganizationByRolename(this.orgId, 'TEACHER').subscribe(
      (res: any) => {
        this.users = res.data;
        console.log(res);
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  onUserStatusUpdate(arg0: any, arg1: any) {
    throw new Error('Method not implemented.');
  }
  updateUser(arg0: any) {
    throw new Error('Method not implemented.');
  }
  deleteUserById(arg0: any) {
    throw new Error('Method not implemented.');
  }
}
