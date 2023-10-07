import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teacher-quiz-details',
  templateUrl: './teacher-quiz-details.component.html',
  styleUrls: ['./teacher-quiz-details.component.scss']
})
export class TeacherQuizDetailsComponent implements OnInit {
  quizId: string = '';

  constructor(private _route: ActivatedRoute){}

  ngOnInit(): void {
    this.quizId = this._route.snapshot.paramMap.get('id') as string;
    console.log('received quiz id  : ' + this.quizId);
  }
}
