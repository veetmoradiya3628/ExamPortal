import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralServiceService {
  private BASE_URL = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  // get quiz details with questions
  public getQuizDetailsWithQuestions(quizId: string): Observable<any> {
    const url = this.BASE_URL + '/quizzes/'+quizId+'/questions';
    return this.http.get(url);
  }
}
