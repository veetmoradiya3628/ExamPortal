import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-create-question',
  templateUrl: './teacher-create-question.component.html',
  styleUrls: ['./teacher-create-question.component.scss']
})
export class TeacherCreateQuestionComponent implements OnInit {
  
  public NO_OF_OPTIONS:number = 5;

  constructor(){}
  
  ngOnInit(): void {
    
  }
}
