import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GeneralServiceService } from 'src/app/common/service/general-service.service';
import { UserServiceService } from 'src/app/common/service/user-service.service';
import { QuizAttemptDto } from 'src/app/models/quiz_attempt_dto.model';
import { QuizAttemptReportService } from 'src/app/services/quiz-attempt-report.service';
import { StudentServiceService } from 'src/app/services/student-service.service';

@Component({
  selector: 'app-student-attempts',
  templateUrl: './student-attempts.component.html',
  styleUrls: ['./student-attempts.component.scss']
})
export class StudentAttemptsComponent implements OnInit {
  studentId: string = '';
  studentQuizAttempts: Array<QuizAttemptDto> = [];
  displayedColumns: string[] = ['quiz_title', 'quiz_status', 'score', 'correct_ques_cnt', 'wrong_ques_cnt', 'not_attempted_ques_cnt','started_at', 'completed_at','action'];
  dataSource!: MatTableDataSource<QuizAttemptDto>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private _userService: UserServiceService,
              private _studentApiService: StudentServiceService,
              private _generalService: GeneralServiceService,
              private _quizAttemptReportGenerator: QuizAttemptReportService) { }

  ngOnInit(): void {
    this.studentId = this._userService.getLoggedInUserId();
    this.loadQuizAttemptsForStudent();
  }

  loadQuizAttemptsForStudent(){
    this._studentApiService.getQuizAttemptsForStudent(this.studentId).subscribe(
      (res: any) => {
        this.studentQuizAttempts = res.data;
        console.log(this.studentQuizAttempts);
        this.dataSource = new MatTableDataSource(this.studentQuizAttempts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error : any) => {
        this._generalService.openSnackBar('Error loading Quiz Attempts!!', 'Ok')
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
