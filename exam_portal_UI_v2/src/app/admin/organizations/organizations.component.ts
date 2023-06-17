import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/service/api-service.service';
import {Organization} from "../../models/organization.model";
import Swal from "sweetalert2";
@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class OrganizationsComponent implements OnInit {
  public organizations: Organization[] | undefined;

  constructor(private apiService: ApiServiceService) {
  }

  ngOnInit(): void {
    this.loadOrganization();
  }

  loadOrganization() {
    this.apiService.getOrganization().subscribe(
      (data: any) => {
        this.organizations = data;
        console.log(this.organizations);

      },
      (error: any) => {
        throw new Error("Error while loading organizations " + error)
      }
    )
  }

  deleteOrganization(data: Organization) {
    Swal.fire({
      title: 'Are you sure want to delete this Organization ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.apiService.deleteOrganization(data.orgId as string).subscribe(
          (data: Organization) => {
            Swal.fire('Organization deleted successfully!', 'success')
            this.loadOrganization();
          },
          (error: any) => {
            Swal.fire('Error occurred while deleting Organization !' + error.message, 'error')
          }
        )
      }
    })
  }
}
