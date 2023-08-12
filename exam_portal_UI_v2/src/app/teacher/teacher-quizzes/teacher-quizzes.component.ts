import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-quizzes',
  templateUrl: './teacher-quizzes.component.html',
  styleUrls: ['./teacher-quizzes.component.css']
})
export class TeacherQuizzesComponent implements OnInit{
  cnt: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  startTime: string = "2023-07-28T18:11:20.357";
  endTimer: string = "2023-07-28T18:11:20.357";
  constructor(){}

  ngOnInit(): void {
  }

}
