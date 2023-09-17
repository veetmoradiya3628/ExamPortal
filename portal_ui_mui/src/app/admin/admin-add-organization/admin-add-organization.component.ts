import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Organization } from 'src/app/models/organization.model';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-admin-add-organization',
  templateUrl: './admin-add-organization.component.html',
  styleUrls: ['./admin-add-organization.component.scss']
})
export class AdminAddOrganizationComponent implements OnInit {
  public addOrganizationForm!: FormGroup;

  constructor(private _apiService: AdminServiceService, private _snackBar: MatSnackBar, private _router: Router){}

  ngOnInit(): void {
    this.addOrganizationForm = new FormGroup({
      orgName: new FormControl('', Validators.required),
      orgDescription: new FormControl('', Validators.required)
    });
  }

  addOrganization(){
    if(this.addOrganizationForm.valid){
      const orgData = this.addOrganizationForm.value as Organization;
      this._apiService.addOrganization(orgData).subscribe(
        (res: Organization) => {
          console.log(res);
          this._snackBar.open('Organization added successfully', 'OK')
          this._router.navigateByUrl('/admin/organization')
        },
        (error : any) => {
          this._snackBar.open('Error occured while adding data', 'OK')
          return;
        }
      )
    }else{
      this._snackBar.open('Form is not valid!!', 'OK')
      return;
    }
  }
}
