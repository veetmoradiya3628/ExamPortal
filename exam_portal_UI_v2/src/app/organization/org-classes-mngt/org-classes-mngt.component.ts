import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Classes } from 'src/app/models/classes.model';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-org-classes-mngt',
  templateUrl: './org-classes-mngt.component.html',
  styleUrls: ['./org-classes-mngt.component.css']
})
export class OrgClassesMngtComponent implements OnInit{
  // this will be dynamic once we make authentication flow & org admin login
  orgId: string = 'a77f5d7b-c50d-418d-8c66-3814049ca386';
  classes!: Array<Classes>;
  createClassMode: boolean = false;
  createClassForm!: FormGroup;

  constructor(private apiService: ApiServiceService, 
              private formBuilder: FormBuilder,
              private route: ActivatedRoute){}

  ngOnInit(): void {
    this.loadClassesforOrg();
    this.createClassForm = this.formBuilder.group({
      classroomTitle: ['', Validators.required],
      classroomSubTitle: ['', Validators.required]
    })
  } 

  loadClassesforOrg(){
    this.apiService.getAllClassesForOrganization(this.orgId).subscribe(
      (res: any) => {
        this.classes = res;
        console.log(this.classes);
      },
      (error: any) => {
        console.log('error while loading classes for organization '+ error)
      }
    )
  }

  setCreateClassMode() {
    this.createClassMode = true;
  }
  
  createClassroom(){
    if(this.createClassForm.valid){
      let newClass = this.createClassForm.value as Classes;
      newClass.classroomCode = this.generateClassCode();
      newClass.organizationId = this.orgId;

      this.apiService.createClass(newClass).subscribe(
        (res: any) => {
          console.log(res);
          this.createClassMode = false;
          this.loadClassesforOrg();
          this.createClassForm.reset();
        },
        (error: any) => {
          console.log(error);
        }
      )
    }
    return;
  }

  generateClassCode(){
    return (Math.random() + 1).toString(36).substring(2);
  }

  cancelCreateEvent(){
    this.createClassMode = false;
  }
}
