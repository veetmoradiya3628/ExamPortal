import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { GeneralServiceService } from 'src/app/common/service/general-service.service';
import { QuizAttemptDto } from 'src/app/models/quiz_attempt_dto.model';
import { QuizAttemptReportService } from 'src/app/services/quiz-attempt-report.service';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';

@Component({
  selector: 'app-teacher-quiz-attempts',
  templateUrl: './teacher-quiz-attempts.component.html',
  styleUrls: ['./teacher-quiz-attempts.component.scss']
})
export class TeacherQuizAttemptsComponent implements OnInit {
  public quizId: string;
  public quizAttempts: Array<QuizAttemptDto> = [];
  displayedColumns: string[] = ['username', 'quiz_status', 'score', 'correct_ques_cnt', 'wrong_ques_cnt', 'not_attempted_ques_cnt','started_at', 'completed_at','action'];
  dataSource!: MatTableDataSource<QuizAttemptDto>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _route: ActivatedRoute, private _apiService: TeacherServiceService,
    private _generalService: GeneralServiceService,
    private _quizAttemptReportGenerator: QuizAttemptReportService) {
    this.quizId = this._route.snapshot.paramMap.get('id') as string;
    console.log('received quiz id  : ' + this.quizId);
  }

  ngOnInit(): void {
    this.loadQuizAttemptforQuiz();
  }

  loadQuizAttemptforQuiz() {
    this._apiService.getQuizAttemptByQuizId(this.quizId).subscribe(
      (res: any) => {
        this.quizAttempts = res.data;
        console.log(this.quizAttempts);
        this.dataSource = new MatTableDataSource(this.quizAttempts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error : any) => {
        console.log(`error occured while trying to load quiz attempt data`);
      }
    )
  }

  openAttemptReportPdf(quizId: string, studentId: string){
    this._generalService.getQuizAttemptDetailsByQuizIdAndStudentId(quizId, studentId).subscribe(
      (res: any) => {
        console.log(res)
        this._quizAttemptReportGenerator.generatePdf(res.data);
      },
      (error : any) => {
        this._generalService.openSnackBar('Error loading quiz attempt data!!!', 'Ok')
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
