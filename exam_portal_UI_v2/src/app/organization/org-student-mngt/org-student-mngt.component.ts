import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-org-student-mngt',
  templateUrl: './org-student-mngt.component.html',
  styleUrls: ['./org-student-mngt.component.css']
})
export class OrgStudentMngtComponent implements OnInit {
  // this will be dynamic once we make authentication flow & org admin login
  orgId: string = 'a77f5d7b-c50d-418d-8c66-3814049ca386';
  users: Array<any> = new Array<any>();

  constructor(private apiService: ApiServiceService, private router: Router) { }

  ngOnInit(): void {
    this.loadStudentForOrganization();
  }

  loadStudentForOrganization() {
    this.apiService.getUsersOfOrganizationByRolename(this.orgId, 'STUDENT').subscribe(
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
