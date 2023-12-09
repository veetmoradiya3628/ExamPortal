import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GeneralServiceService } from 'src/app/common/service/general-service.service';
import { Organization } from 'src/app/models/organization.model';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-admin-add-organization',
  templateUrl: './admin-add-organization.component.html',
  styleUrls: ['./admin-add-organization.component.scss']
})
export class AdminAddOrganizationComponent implements OnInit {
  public addOrganizationForm!: FormGroup;

  constructor(private _apiService: AdminServiceService, 
              private _router: Router,
              private _generalService: GeneralServiceService){}

  ngOnInit(): void {
    this.addOrganizationForm = new FormGroup({
      orgName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
      orgDescription: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(255)])
    });
  }

  addOrganization(){
    if(this.addOrganizationForm.valid){
      const orgData = this.addOrganizationForm.value as Organization;
      this._apiService.addOrganization(orgData).subscribe(
        (res: Organization) => {
          console.log(res);
          this._generalService.openSnackBar('Organization added successfully', 'OK')
          this._router.navigateByUrl('/admin/organization')
        },
        (error : any) => {
          this._generalService.openSnackBar('Error occured while adding data', 'OK')
          return;
        }
      )
    }else{
      this._generalService.openSnackBar('Form is not valid!!', 'OK')
      return;
    }
  }
}
