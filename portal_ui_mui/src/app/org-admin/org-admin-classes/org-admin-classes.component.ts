import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/common/service/user-service.service';
import { Classes } from 'src/app/models/classes.model';
import { OrgAdminServiceService } from 'src/app/services/org-admin-service.service';

@Component({
  selector: 'app-org-admin-classes',
  templateUrl: './org-admin-classes.component.html',
  styleUrls: ['./org-admin-classes.component.scss']
})
export class OrgAdminClassesComponent implements OnInit {
  // this will be dynamic once we make authentication flow & org admin login
  orgId: string = '';
  classes!: Array<Classes>;

  constructor(private _apiService: OrgAdminServiceService,
              private _router: Router,
              private _userService : UserServiceService) { }

  ngOnInit(): void {
    this.orgId = this._userService.getLoginUserOrganizationId();
    console.log(`LoggedIn user organizationId : ${this.orgId}`)
    this.loadClassesForOrganization();
  }

  loadClassesForOrganization() {
    this._apiService.getAllClassesForOrganization(this.orgId).subscribe(
      (res: any) => {
        this.classes = res;
        console.log(this.classes);
      },
      (error: any) => {
        console.log('error while loading classes for organization ' + error)
      }
    )
  }

  // createClassroom() {
  //   this._router.navigate(['../',this.orgId,'/create-class'])
  // }
}
