import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Organization } from 'src/app/models/organization.model';
import { IUser } from 'src/app/models/user.model';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  public Organizations!: Array<Organization>;
  public addUserForm!: FormGroup;
  public editMode: boolean = false;
  public userId!: string;
  public userData!: IUser;

  constructor(private apiService: ApiServiceService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
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
    this.loadOrganizationData();

    this.route.queryParams.subscribe(params => {
      if (params && params['userId']) {
        this.editMode = true;
        this.userId = params['userId'];
        this.apiService.getUserByuserId(params['userId'] as string).subscribe(
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
    })
  }

  loadOrganizationData(): any {
    this.apiService.getOrganization().subscribe(
      (res: Array<Organization>) => {
        this.Organizations = res;
        console.log(this.Organizations);
      },
      (error: any) => {
        console.log('Error occured while loading organization data for add user ' + error);
      }
    )
  }

  addOrModifyUser(): any {
    console.log(this.addUserForm.value);
    if (!this.editMode) {
      // editMode off
      this.apiService.addUser(this.addUserForm.value as IUser).subscribe(
        (res: any) => {
          console.log("Add User ended");
          console.log(res);
        },
        (error: any) => {
          console.log("Error occured while adding User");
        }
      )
    } else {
      // editMode on
      const updateBodyObject =  {
        'username': this.addUserForm.get('username')?.value,
        'email': this.addUserForm.get('email')?.value,
        'firstName': this.addUserForm.get('firstName')?.value,
        'lastName': this.addUserForm.get('lastName')?.value,
        'phone': this.addUserForm.get('phone')?.value,
      };
      console.log(updateBodyObject);
      this.apiService.updateUser(updateBodyObject, this.userId).subscribe(
        (res: any) => {
          console.log("Update User Done");
          console.log(res);
        },
        (error: any) => {
          console.log("Error occured while updating User");
        }
      )
    }
  }

  cancelClick(){
    this.router.navigate(['/admin/users']);
  }
}
