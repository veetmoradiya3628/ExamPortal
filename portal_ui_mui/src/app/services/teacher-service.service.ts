import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherServiceService {
  private BASE_URL = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  // get quizzes for users with userId
  public getQuizzesForUser(userId: string): Observable<any> {
    const url = this.BASE_URL + '/quizzes/user/' + userId;
    return this.http.get(url);
  }

  // get classroom for users with userid
  public getClassroomMappedToUser(userId: string): Observable<any> {
    const url = this.BASE_URL + '/user/' + userId + '/classrooms';
    return this.http.get(url);
  }

  // get questions for quiz with quizId
  public getQuestionsForQuizWithId(quizId: string): Observable<any> {
    const url = this.BASE_URL + '/question/quiz/' + quizId;
    return this.http.get(url);
  }

}
