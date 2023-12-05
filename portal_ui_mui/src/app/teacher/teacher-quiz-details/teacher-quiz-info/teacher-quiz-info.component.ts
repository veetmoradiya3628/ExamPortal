import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { GeneralServiceService } from 'src/app/common/service/general-service.service';
Chart.register(...registerables);

@Component({
  selector: 'app-teacher-quiz-info',
  templateUrl: './teacher-quiz-info.component.html',
  styleUrls: ['./teacher-quiz-info.component.scss']
})
export class TeacherQuizInfoComponent implements OnInit {
  public quizDetails: any = {};
  public singleCorrectQuesCnt: number = 0;
  public multipleCorrectQuesCnt: number = 0;
  public trueFalseQuesCnt: number = 0;

  @Input() quizId!: string;

  constructor(private _apiService: GeneralServiceService) { }

  ngOnInit(): void {
    this.loadQuizDetails(this.quizId);
    setTimeout(() => {
      this.renderQuizGraph();
    }, 500)
  }

  loadQuizDetails(quizId: string) {
    this._apiService.getQuizDetailsWithQuestions(quizId).subscribe(
      (res: any) => {
        console.log(res);
        this.quizDetails = res.data;

        this.quizDetails.questionDetails.forEach((ques: any) => {
          if (ques.questionType && ques.questionType === 'SINGLE_CORRECT') {
            this.singleCorrectQuesCnt++;
          } else if (ques.questionType && ques.questionType === 'MULTIPLE_CORRECT') {
            this.multipleCorrectQuesCnt++;
          } else if (ques.questionType && ques.questionType === 'TRUE_FALSE') {
            this.trueFalseQuesCnt++;
          }
        });
        console.log(`single correct : ${this.singleCorrectQuesCnt}, multiple correct : ${this.multipleCorrectQuesCnt}, true false : ${this.trueFalseQuesCnt}`)
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  renderQuizGraph() {
    const quizQuestionChart = new Chart("quizquestionchart", {
      type: 'pie',
      data: {
        labels: [
          'Single Correct',
          'Multiple Correct',
          'True/False'
        ],
        datasets: [{
          label: 'Question Stats',
          data: [this.singleCorrectQuesCnt, this.multipleCorrectQuesCnt, this.trueFalseQuesCnt],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        },
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Questions Stats'
          }
        }
      },
    });
  }

}
