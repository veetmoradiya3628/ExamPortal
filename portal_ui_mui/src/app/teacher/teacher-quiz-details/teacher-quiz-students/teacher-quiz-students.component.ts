import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/models/user.model';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';

@Component({
  selector: 'app-teacher-quiz-students',
  templateUrl: './teacher-quiz-students.component.html',
  styleUrls: ['./teacher-quiz-students.component.scss']
})
export class TeacherQuizStudentsComponent implements OnInit {

  private quizId!: string;
  public mappedStudents: Array<IUser> = [];

  displayedColumns: string[] = ['username', 'email', 'is_enabled'];
  dataSource!: MatTableDataSource<IUser>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private _route: ActivatedRoute, private _apiService: TeacherServiceService) {
    this.quizId = this._route.snapshot.paramMap.get('id') as string;
    console.log('received quiz id  : ' + this.quizId);
  }

  ngOnInit(): void {
    this.loadStudentforQuiz();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadStudentforQuiz() {
    this._apiService.getStudentByQuizId(this.quizId).subscribe(
      (res: any) => {
        this.mappedStudents = res.data;
        console.log(this.mappedStudents);
        // teacher data populate to the teacher table
        this.dataSource = new MatTableDataSource(this.mappedStudents);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  deleteStudentMapping(userId: string) {
  }

}
