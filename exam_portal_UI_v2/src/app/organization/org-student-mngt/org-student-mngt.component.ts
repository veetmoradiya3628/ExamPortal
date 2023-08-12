import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/models/user.model';
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
  addStudentMode: boolean = false;
  public addUserForm!: FormGroup;
  public editMode: boolean = false;
  public userId!: string;
  public userData!: IUser;
  public editUserId!: string;


  constructor(private apiService: ApiServiceService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({
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

  onUserStatusUpdate(userId: any, status: any) {
    console.log(userId, status);
    status = !status;
    this.apiService.updateUserStatus(userId, status).subscribe(
      (data: any) => {
        console.log(data);
        this.loadStudentForOrganization();
      },
      (error: any) => {
        throw new Error("Error while updating user status ... ");
      }
    )
  }

  addOrModifyUser() {
    console.log(this.addUserForm.value);
    let userReqObject: IUser = this.addUserForm.value as IUser;
    userReqObject.organization!.orgId = this.orgId;

    userReqObject.enabled = true;
    userReqObject.roleName = "STUDENT";

    if (this.editMode) {
      // edit mode so request for update
      const updateBodyObject =  {
        'username': this.addUserForm.get('username')?.value,
        'email': this.addUserForm.get('email')?.value,
        'firstName': this.addUserForm.get('firstName')?.value,
        'lastName': this.addUserForm.get('lastName')?.value,
        'phone': this.addUserForm.get('phone')?.value,
      };
      console.log(updateBodyObject);
      this.apiService.updateUser(updateBodyObject, this.editUserId).subscribe(
        (res: any) => {
          console.log("Update User Done");
          console.log(res);
          this.editMode = !this.editMode;
          this.addStudentMode = !this.addStudentMode
          this.loadStudentForOrganization();
        },
        (error: any) => {
          console.log("Error occured while updating User");
        }
      )
    } else {
      // fresh mode so request for create new user
      this.apiService.addUser(userReqObject).subscribe(
        (res: any) => {
          console.log(res);
          this.addStudentMode = !this.addStudentMode;
          this.loadStudentForOrganization();
        },
        (error: any) => {
          console.log(error);
        }
      )
    }
  }

  updateUser(userId: any) {
    console.log(userId);
    this.addStudentMode = !this.addStudentMode
    this.editMode = !this.editMode
    this.editUserId = userId
    this.apiService.getUserByuserId(userId as string).subscribe(
      (res: any) => {
        this.userData = res;
        console.log(this.userData);
        this.addUserForm.patchValue(this.userData);
      },
      (error: any) => {
        throw new Error("Error occurred : " + error);
      }
    )
  }

  deleteUserById(arg0: any) {
    throw new Error('Method not implemented.');
  }

  changeAddStudentMode() {
    this.addStudentMode = !this.addStudentMode;
    this.editMode = false
    this.addUserForm.reset();
  }
}
