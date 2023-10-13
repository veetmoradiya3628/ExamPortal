import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/models/user.model';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-org-admin-create-student',
  templateUrl: './org-admin-create-student.component.html',
  styleUrls: ['./org-admin-create-student.component.scss']
})
export class OrgAdminCreateStudentComponent implements OnInit {
  // this will be dynamic once we make authentication flow & org admin login
  orgId: string = 'a77f5d7b-c50d-418d-8c66-3814049ca386';
  public addStudentForm!: FormGroup;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, private _apiService: AdminServiceService) { }

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
        this.router.navigateByUrl('/org-admin/student')
      },
      (error: any) => {
        console.log(`error orrcured while adding student`)
      }
    )
  }
}
