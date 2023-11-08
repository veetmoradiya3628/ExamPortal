import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GeneralServiceService } from '../../service/general-service.service';
import { Comments } from 'src/app/models/comments.model';
import { UserServiceService } from '../../service/user-service.service';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss']
})
export class PostCommentsComponent implements OnInit {
  public postId: string = '';
  public comments: Array<Comments> = [];
  public commentText: string = '';

  constructor(public dialogRef: MatDialogRef<PostCommentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _generalService: GeneralServiceService,
    private _userService: UserServiceService) {
    console.log(data);
    this.postId = data.postId;
  }

  ngOnInit(): void {
    this.loadPostCommentsForPost();
  }

  loadPostCommentsForPost() {
    this._generalService.getCommentsForPostByPostId(this.postId).subscribe(
      (res: any) => {
        this.comments = res.data;
        console.log(this.comments);
      },
      (error: any) => {
        console.log(`error occured while loading post comments`)
        console.log(error)
      }
    )
  }

  postCommentButtonClick(){
    if(this.commentText && this.commentText !== ''){
      let reqObj : any = {};
      reqObj['userId'] = this._userService.getLoggedInUserId();
      reqObj['postId'] = this.postId;
      reqObj['commentMessage'] = this.commentText;
      console.log(reqObj);
      this._generalService.createComment(reqObj).subscribe(
        (res: any) => {
          console.log(res);
          this._generalService.openSnackBar('Comment added successfully!!', 'Ok')
          this.loadPostCommentsForPost();
        },
        (error: any) => {
          console.log(`error occred while adding comment ${error}`)
          this._generalService.openSnackBar('Error occred while adding comment', 'Ok')
        }
      )
    }
    this._generalService.openSnackBar('Invalid Comment Text!!', 'Ok')
    return
  }

}
