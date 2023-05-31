import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class OrganizationsComponent implements OnInit{
  organizations: Array<any> = new Array<any>();

  constructor(private apiService: ApiServiceService){}

  ngOnInit(): void {
    this.loadOrganization();
  }

  loadOrganization(){
    this.apiService.getOrganization().subscribe(
      (data: any) => {
        this.organizations = data;
        console.log(this.organizations);
        
      },
      (error: any) => {
        throw new Error("Error while loading organizations "+error)
      }
    )
  }
  
}
