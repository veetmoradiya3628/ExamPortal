import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Classes } from 'src/app/models/classes.model';
import { Posts } from 'src/app/models/posts.model';
import { ApiServiceService } from 'src/app/service/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-class-post-section',
  templateUrl: './class-post-section.component.html',
  styleUrls: ['./class-post-section.component.css']
})
export class ClassPostSectionComponent implements OnInit {

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
    this.loadPostsForClass(this.classId);
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

  postFormSubmit() {
    console.log('post add clicked');
    if (this.postContent != undefined && this.postContent != null) {
      let postData: Posts = {} as Posts;
      postData.postContent = JSON.stringify(this.postContent);
      postData.classroomId = this.classDetails.classroomId as string;
      postData.commentAllowed = true;
      postData.userId = 'b5b44cbe-ce96-4518-b814-011e0d1b9678'; // after login need to use logged In userId from cookies data
      console.log('post data before making request ' + postData);
      this._apiService.addPost(postData).subscribe(
        (res: any) => {
          console.log(res);
          this.postContent = null;
          this.loadPostsForClass(this.classId);
        },
        (error: any) => {
          console.log('Error while adding post : ' + error)
        }
      )
    } else {
      return;
    }
  }


  editPost() {
    console.log('edit post clicked');
  }

  deletePost(postId: any) {
    console.log('delete post clicked for id : ' + postId);
    Swal.fire({
      title: 'Are you sure want to delete this Post ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this._apiService.deletePostById(postId).subscribe(
          (data: any) => {
            console.log(data);
            this.loadPostsForClass(this.classId);
          },
          (error: any) => {
            console.log('error while deleting post...');
          }
        )
      }
    })
  }
}
