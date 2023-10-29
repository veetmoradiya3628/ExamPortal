import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralServiceService } from 'src/app/common/service/general-service.service';
import { UserServiceService } from 'src/app/common/service/user-service.service';
import { IUser } from 'src/app/models/user.model';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-org-admin-create-student',
  templateUrl: './org-admin-create-student.component.html',
  styleUrls: ['./org-admin-create-student.component.scss']
})
export class OrgAdminCreateStudentComponent implements OnInit {
  // this will be dynamic once we make authentication flow & org admin login
  orgId: string = '';
  public addStudentForm!: FormGroup;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, 
    private _apiService: AdminServiceService,
    private _userService: UserServiceService,
    private _generalService: GeneralServiceService) { }

  ngOnInit(): void {
    this.addStudentForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      enabled: [0],
      roleName: ["STUDENT", Validators.required],
      organization: this.formBuilder.group({
        orgId: ['', Validators.required]
      })
    })
    this.orgId = this._userService.getLoginUserOrganizationId();
  }

  addStudentSubmit() {
    let userRequestObject: IUser = this.addStudentForm.value as IUser;
    userRequestObject.organization!.orgId = this.orgId;
    userRequestObject.enabled = true;
    userRequestObject.roleName = "STUDENT";

    console.log(`final addUser request object ${userRequestObject}`)
    this._apiService.addUser(userRequestObject).subscribe(
      (res: any) => {
        console.log(res)
        this._generalService.openSnackBar('Student created successfully!!', 'Ok')        
        this.router.navigateByUrl('/org-admin/student')
      },
      (error: any) => {
        this._generalService.openSnackBar('Error occured while adding Student!!', 'Ok')
        console.log(`error orrcured while adding student`)
      }
    )
  }
}
