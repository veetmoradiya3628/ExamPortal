import { Component, OnInit } from '@angular/core';
import { Organization } from 'src/app/models/organization.model';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit{
  private Organizations!: Array<Organization>;

  constructor(private apiService: ApiServiceService){}
  
  ngOnInit(): void {
    this.loadOrganizationData();
  }

  loadOrganizationData(): any {
    this.apiService.getOrganization().subscribe(
      (res: Array<Organization>) => {
        this.Organizations = res;
        console.log(this.Organizations);
      },
      (error: any) => {
        console.log('Error occured while loading organization data for add user '+error);
      }
    )
  }

}
