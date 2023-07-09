import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Classes } from 'src/app/models/classes.model';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-org-class-details',
  templateUrl: './org-class-details.component.html',
  styleUrls: ['./org-class-details.component.css']
})
export class OrgClassDetailsComponent implements OnInit{
  public classId!: string;
  public classDetails!: Classes; 

  constructor(private _route: ActivatedRoute, private _apiService: ApiServiceService) {
    this._route.params.subscribe(params => this.classId = params['id']);
  }

  ngOnInit(): void {
    this.loadClassroomById();
  }

  loadClassroomById(){
    this._apiService.getClassroomDetailsById(this.classId).subscribe(
      (res: any) => {
        this.classDetails = res.body;
        console.log(this.classDetails)
      },
      (error: any) => {
        console.log('error while loading classroom details');
      }
    )
  }

}
