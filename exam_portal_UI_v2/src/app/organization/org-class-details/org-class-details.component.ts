import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Classes } from 'src/app/models/classes.model';
import { Posts } from 'src/app/models/posts.model';
import { ApiServiceService } from 'src/app/service/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-org-class-details',
  templateUrl: './org-class-details.component.html',
  styleUrls: ['./org-class-details.component.css']
})
export class OrgClassDetailsComponent implements OnInit {
  public classPosts: Array<Posts> = [];
  public postsCnt: number = 0;
  public Editor: any = ClassicEditor;
  public classId!: string;
  public classDetails: Classes = { classroomId: '', classroomTitle: '', classroomSubTitle: '' };
  public postContent: any = '';


  constructor(private _route: ActivatedRoute, private _apiService: ApiServiceService, private router: Router) {
    this._route.params.subscribe(params => this.classId = params['id']);
  }

  ngOnInit(): void {
    this.loadClassroomById();
  }


  loadClassroomById() {
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
