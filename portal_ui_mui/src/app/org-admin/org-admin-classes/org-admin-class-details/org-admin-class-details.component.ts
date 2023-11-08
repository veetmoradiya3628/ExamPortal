import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DeleteModelServiceService } from 'src/app/common/delete-model-service.service';
import { PostCommentsComponent } from 'src/app/common/dialogs/post-comments/post-comments.component';
import { GeneralServiceService } from 'src/app/common/service/general-service.service';
import { UserServiceService } from 'src/app/common/service/user-service.service';
import { Classes } from 'src/app/models/classes.model';
import { Posts } from 'src/app/models/posts.model';
import { IUser } from 'src/app/models/user.model';
import { OrgAdminServiceService } from 'src/app/services/org-admin-service.service';

@Component({
  selector: 'app-org-admin-class-details',
  templateUrl: './org-admin-class-details.component.html',
  styleUrls: ['./org-admin-class-details.component.scss']
})
export class OrgAdminClassDetailsComponent implements OnInit {

  public classPosts: Array<Posts> = [];
  public postsCnt: number = 0;
  public classId!: string;
  public classDetails: Classes = { classroomId: '', classroomTitle: '', classroomSubTitle: '' };
  public postContent: any = '';
  public Editor: any = ClassicEditor;

  constructor(private _route: ActivatedRoute,
    private router: Router,
    private _apiService: OrgAdminServiceService,
    private _generalService: GeneralServiceService,
    private _userService: UserServiceService,
    private _modelService: DeleteModelServiceService,
    public dialog: MatDialog) {
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

  postFormSubmot(){
    if (this.postContent !== undefined && this.postContent !== null  && this.postContent !== ''){
      console.log(this.postContent);
      let postData: Posts = {} as Posts;
      postData.postContent = JSON.stringify(this.postContent);
      postData.classroomId = this.classDetails.classroomId as string;
      postData.commentAllowed = true;
      postData.userId = this._userService.getLoggedInUserId(); // after login need to use logged In userId from cookies data
      console.log('post data before making request ' + postData);
      this._apiService.addPost(postData).subscribe(
        (res: any) => {
          console.log(res);
          this._generalService.openSnackBar('Posted a post successfully!!', 'ok')
          this.postContent = null;
          this.loadPostsForClass(this.classId);
        },
        (error: any) => {
          this._generalService.openSnackBar('error occured while posting a post', 'ok')
          console.log('Error while adding post : ' + error)
        }
      )
    }else{
      this._generalService.openSnackBar('please provide valid post detail to post!!', 'ok')
      return;
    }
  }

  deletePost(postId: string | undefined){
    console.log(`delete post called for postId : ${postId}`)
    this._modelService.openConfirmationDialog('Are you sure want to delete this Post ?').then((result) => {
      if(result){
        this._apiService.deletePost(postId).subscribe(
          (res: any) => {
            this._generalService.openSnackBar('Post deleted successfully!!', 'OK')
            this.loadPostsForClass(this.classId)
          },
          (error : any) => {
            this._generalService.openSnackBar('Post deletion failed', 'OK')
          }
        )
      }else{
        // user cancel the action
        return;
      }
    })
  }

  openPostComments(postId: string | undefined){
    console.log(`post comments model open received for postId ${postId}`)
    const dialogRef = this.dialog.open(PostCommentsComponent, {
      data: {postId: postId},
      height: '700px',
      width: '1000px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
