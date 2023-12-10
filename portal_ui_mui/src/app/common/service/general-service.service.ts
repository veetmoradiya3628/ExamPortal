import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ResetPassword } from 'src/app/models/reset_password.model';

@Injectable({
  providedIn: 'root'
})
export class GeneralServiceService {
  
  private BASE_URL = "http://localhost:8080";

  constructor(private http: HttpClient, private _matSnackBar: MatSnackBar) { }

  openSnackBar(informationText: string, actionText: string) {
    this._matSnackBar.open(informationText, actionText, {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    })
  }

  // get quiz details with questions
  public getQuizDetailsWithQuestions(quizId: string): Observable<any> {
    const url = this.BASE_URL + '/quizzes/' + quizId + '/questions';
    return this.http.get(url);
  }

  public login(requestObj: any): Observable<any> {
    const url = this.BASE_URL + '/generate-token'
    return this.http.post(url, requestObj);
  }

  // get quiz attempt full detail
  public getQuizAttemptDetailsByQuizIdAndStudentId(quizId: string, userId: string): Observable<any> {
    const url = this.BASE_URL + '/quiz_attempt/' + quizId + '/student/' + userId;
    return this.http.get(url);
  }

  // get comment details for post
  public getCommentsForPostByPostId(porstId: string | undefined): Observable<any> {
    const url = this.BASE_URL + '/api/comments/' + porstId;
    return this.http.get(url);
  }

  // add comment for post
  createComment(reqObj: any): Observable<any> {
    const url = this.BASE_URL + '/api/comments/';
    return this.http.post(url, reqObj);
  }

  // delete comment for post
  deleteComment(commentId: string): Observable<any> {
    const url = this.BASE_URL + '/api/comments/' + commentId;
    return this.http.delete(url);
  }

  // reset user password 
  public resetUserPassword(userId: string, requestObj: ResetPassword) : Observable<any> {
    const url = this.BASE_URL + '/user/' + userId + '/resetPassword';
    return this.http.post(url, requestObj);
  }
}
