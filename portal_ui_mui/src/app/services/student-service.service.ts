import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionAttemptDto } from '../models/question_attempt_dto.model';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {
  private BASE_URL = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  // start quiz attempt
  public startQuiz(reqObj: any) : Observable<any> {
    const url = this.BASE_URL + '/quiz_attempt/startQuiz';
    return this.http.post(url, reqObj);
  }

  // submit question response
  public submitQuestion(questionId: string | undefined, userId: string, reqObj: QuestionAttemptDto) : Observable<any> {
    const url = this.BASE_URL + '/question_attempt/' + questionId + '/user/' + userId;
    return this.http.post(url, reqObj);
  }

  // end quiz 
  public endQuiz(reqObj : any) : Observable<any> {
    const url = this.BASE_URL + '/quiz_attempt/endQuiz';
    return this.http.post(url, reqObj);
  }
}
