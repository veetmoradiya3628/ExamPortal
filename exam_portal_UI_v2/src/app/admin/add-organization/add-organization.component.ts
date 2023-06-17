import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Organization} from "../../models/organization.model";
import {ApiServiceService} from "../../service/api-service.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.css']
})
export class AddOrganizationComponent implements OnInit{

  public addOrganizationForm!: FormGroup;

  ngOnInit(): void {
    this.addOrganizationForm = new FormGroup({
      orgName: new FormControl('', Validators.required),
      orgDescription: new FormControl('', Validators.required)
    })
  }

  constructor(private apiService: ApiServiceService) {
  }

  addOrganization() : void {
    Swal.fire({
      title: 'Are you sure want to add Organization ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if(result.value) {
        if (this.addOrganizationForm.valid) {
          const orgData = this.addOrganizationForm.value as Organization;
          this.apiService.addOrganization(orgData).subscribe(
            (data: Organization) => {
              Swal.fire('Organization added successfully!', 'success')
            },
            (error: any) => {
              Swal.fire('Error occurred while adding Organization !' + error.message, 'error')
            }
          )
        } else {
          console.error('this.addOrganizationForm.invalid');
        }
      }
    })
  }
}
