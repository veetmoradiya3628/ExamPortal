import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralServiceService {
  private BASE_URL = "http://localhost:8080";

  constructor(private http: HttpClient, private _matSnackBar: MatSnackBar) { }

  openSnackBar(informationText: string, actionText: string){
    this._matSnackBar.open(informationText, actionText, {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    })
  }

  // get quiz details with questions
  public getQuizDetailsWithQuestions(quizId: string): Observable<any> {
    const url = this.BASE_URL + '/quizzes/'+quizId+'/questions';
    return this.http.get(url);
  }

  public login(requestObj: any) : Observable<any> {
    const url = this.BASE_URL + '/generate-token'
    return this.http.post(url, requestObj);
  }
}
