import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/models/question.model';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';

@Component({
  selector: 'app-teacher-quiz-questions',
  templateUrl: './teacher-quiz-questions.component.html',
  styleUrls: ['./teacher-quiz-questions.component.scss']
})
export class TeacherQuizQuestionsComponent implements OnInit {

  questions: Array<Question> = [];
  @Input() quizId!: string;

  constructor(private _apiService: TeacherServiceService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.loadQuestionForQuiz();
  }

  loadQuestionForQuiz() {
    console.log('loading questions for quiz')
    this._apiService.getQuestionsForQuizWithId(this.quizId).subscribe(
      (res: any) => {
        console.log(res);
        this.questions = res.data;
        console.log(this.questions);
      },
      (error: any) => {
        console.log('error : ' + error);
      }
    )
  }

  createQuestion() {
    this.router.navigate(['../add-question'], { relativeTo: this.route });
  }

}
