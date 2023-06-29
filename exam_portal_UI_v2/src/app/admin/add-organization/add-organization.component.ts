import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Organization} from "../../models/organization.model";
import {ApiServiceService} from "../../service/api-service.service";
import Swal from 'sweetalert2';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.css']
})
export class AddOrganizationComponent implements OnInit{

  public addOrganizationForm!: FormGroup;
  public editMode: boolean = false;
  public orgData: Organization | undefined;
  public orgId!: string;

  constructor(private apiService: ApiServiceService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.addOrganizationForm = new FormGroup({
      orgName: new FormControl('', Validators.required),
      orgDescription: new FormControl('', Validators.required)
    });

    this.route.queryParams.subscribe(params => {
      if (params && params['orgId']) {
        this.editMode = true;
        this.orgId = params['orgId'];
        this.apiService.getOrganizationById(params['orgId'] as string).subscribe(
          (res: any) => {
            this.orgData = res;
            this.addOrganizationForm.patchValue({
              orgName: this.orgData?.orgName,
              orgDescription: this.orgData?.orgDescription
            })
          },
          (error: any) => {
            throw new Error("Error occurred : " + error);
          }
        )
      }
    })
  }

  addOrganization() : void {
    if(!this.editMode){
      console.log('edit mode off');
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

  editOrganization() {
    console.log(this.addOrganizationForm.value);
    if(this.addOrganizationForm.valid) {
      this.apiService.updateOrganizationById(this.orgId, this.addOrganizationForm.value as Organization).subscribe(
        (res : any) => {
          console.log(res);
          this.router.navigate(['/admin/organization']);
        },
        (error: any) => {
          console.log('Error occured while updating organization with id : '+this.orgId)
        }
      )
    }
  }

}
