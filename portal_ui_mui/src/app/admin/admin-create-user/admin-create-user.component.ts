import { Component, OnInit } from '@angular/core';
import { Organization } from 'src/app/models/organization.model';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-admin-create-user',
  templateUrl: './admin-create-user.component.html',
  styleUrls: ['./admin-create-user.component.scss']
})
export class AdminCreateUserComponent implements OnInit{
  public Organizations!: Array<Organization>;
  
  constructor(private _apiService: AdminServiceService){}

  ngOnInit(): void {
    this.loadOrganizationData();
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
}
