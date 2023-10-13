import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Organization } from 'src/app/models/organization.model';
import { IUser } from 'src/app/models/user.model';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-admin-create-user',
  templateUrl: './admin-create-user.component.html',
  styleUrls: ['./admin-create-user.component.scss']
})
export class AdminCreateUserComponent implements OnInit {
  public Organizations!: Array<Organization>;
  public addUserForm!: FormGroup;

  constructor(private _apiService: AdminServiceService,
              private formBuilder: FormBuilder,
              private _route: ActivatedRoute,
              private _router: Router) {}

  ngOnInit(): void {
    this.loadOrganizationData();
    this.addUserForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      enabled: [0],
      roleName: ['', Validators.required],
      organization: this.formBuilder.group({
        orgId: ['', Validators.required]
      })
    })
  }

  loadOrganizationData(): any {
    this._apiService.getOrganization().subscribe(
      (res: Array<Organization>) => {
        this.Organizations = res;
        console.log(this.Organizations);
      },
      (error: any) => {
        console.log('Error occured while loading organization data for add user ' + error);
      }
    )
  }

  createUser(){
    if(this.addUserForm.valid){
      let requestObj = this.addUserForm.value;
      this._apiService.addUser(this.addUserForm.value as IUser).subscribe(
        (res: any) => {
          console.log(res)
          this._router.navigateByUrl('/admin/users')
        },
        (error : any) => {
          console.log(`Error occured while adding user ${error}`)
        }
      ) 
    }else{
      console.log(`Invalid add user form`)
    }
  }
}
