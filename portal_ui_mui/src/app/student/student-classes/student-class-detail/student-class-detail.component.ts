import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Classes } from 'src/app/models/classes.model';
import { Posts } from 'src/app/models/posts.model';
import { OrgAdminServiceService } from 'src/app/services/org-admin-service.service';

@Component({
  selector: 'app-student-class-detail',
  templateUrl: './student-class-detail.component.html',
  styleUrls: ['./student-class-detail.component.scss']
})
export class StudentClassDetailComponent implements OnInit {
  public classPosts: Array<Posts> = [];
  public postsCnt: number = 0;
  public classId!: string;
  public classDetails: Classes = { classroomId: '', classroomTitle: '', classroomSubTitle: '' };
  public postContent: any = '';
  public Editor: any = ClassicEditor;

  constructor(private _route: ActivatedRoute,
    private router: Router,
    private _apiService: OrgAdminServiceService) {
    this._route.params.subscribe(params => this.classId = params['id']);

    this.loadClassroomById();
    this.loadPostsForClass(this.classId);
  }

  ngOnInit(): void {
  }

  loadPostsForClass(classId: string) {
    this._apiService.getPostForClassroom(classId).subscribe(
      (res: any) => {
        console.log(res);
        this.classPosts = res.data;
        this.classPosts.forEach(post => {
          post['postContent'] = JSON.parse(post.postContent);
        })
        this.postsCnt = this.classPosts.length;
      },
      (error: any) => {
        console.log('Error while loading post details for classroom ' + error);
      }
    )
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
