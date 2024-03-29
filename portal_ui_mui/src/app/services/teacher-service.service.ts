import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../models/question.model';

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

  // add Question
  public addQuestion(questionData: Question): Observable<any> {
    const url = this.BASE_URL + '/question/create';
    return this.http.post(url, questionData);
  }

  // delete Question with questionId
  public deleteQuestionwithId(questionId: string): Observable<any> {
    const url = this.BASE_URL + '/question/' + questionId;
    return this.http.delete(url);
  }

  // add quiz
  public addQuiz(reqObject: any): Observable<any> {
    const url = this.BASE_URL + '/quizzes/create';
    return this.http.post(url, reqObject)
  }

  // get students of quiz by quizId
  public getStudentByQuizId(quizId: string | undefined): Observable<any> {
    const url = this.BASE_URL + '/quizzes/' + quizId + '/students'
    return this.http.get(url);
  }

  // get attempts of quiz by quizId
  public getQuizAttemptByQuizId(quizId: string | undefined): Observable<any> {
    const url = this.BASE_URL + '/quiz_attempt/' + quizId + '/attempts'
    return this.http.get(url);
  }
}
