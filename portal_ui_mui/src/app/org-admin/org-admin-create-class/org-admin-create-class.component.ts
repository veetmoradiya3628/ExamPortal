import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Classes } from 'src/app/models/classes.model';
import { OrgAdminServiceService } from 'src/app/services/org-admin-service.service';

@Component({
  selector: 'app-org-admin-create-class',
  templateUrl: './org-admin-create-class.component.html',
  styleUrls: ['./org-admin-create-class.component.scss']
})
export class OrgAdminCreateClassComponent implements OnInit {
  orgId!: string;
  createClassForm!: FormGroup;

  constructor(private _route: ActivatedRoute, private formBuilder: FormBuilder, private _apiService: OrgAdminServiceService, private _router: Router) { }

  ngOnInit(): void {
    this.orgId = this._route.snapshot.paramMap.get('id') as string;
    console.log(this.orgId)
    this.createClassForm = this.formBuilder.group({
      classroomTitle: ['', Validators.required],
      classroomSubTitle: ['', Validators.required]
    })
  }

  addClassroom() {
    if (this.createClassForm.valid) {
      let requestObject = this.createClassForm.value as Classes;
      requestObject.classroomCode = this.generateClassCode();
      requestObject.organizationId = this.orgId;

      this._apiService.createClass(requestObject).subscribe(
        (res: any) => {
          console.log(res);
          this._router.navigate(['/org-admin/classes']);
        },
        (error: any) => {
          console.log('error occured while creating classroom')
        }
      )

    }
  }

  generateClassCode() {
    return (Math.random() + 1).toString(36).substring(2);
  }

}
