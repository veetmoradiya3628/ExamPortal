import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http: HttpClient) { }

  // get quizzes
  public quizzez(){
    return this._http.get(`${baseUrl}/quiz/`);
  }

  // add quiz
  public addQuiz(quizData: any){
    return this._http.post(`${baseUrl}/quiz/`,quizData);
  }

  // delete quiz
  public deleteQuiz(qId: any){
    return this._http.delete(`${baseUrl}/quiz/${qId}`);
  }

  // get the single quiz
  public getSingleQuiz(qId: any){
    return this._http.get(`${baseUrl}/quiz/${qId}`);
  }

  // update quiz by id
  public updateQuiz(quizData: any){
    return this._http.put(`${baseUrl}/quiz/`, quizData);
  }
}
