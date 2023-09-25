import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/models/user.model';
import { OrgAdminServiceService } from 'src/app/services/org-admin-service.service';

@Component({
  selector: 'app-org-admin-class-students',
  templateUrl: './org-admin-class-students.component.html',
  styleUrls: ['./org-admin-class-students.component.scss']
})
export class OrgAdminClassStudentsComponent implements OnInit {

  public mappedStudents: Array<IUser> = [];
  @Input() classId!: string;
  
  displayedColumns: string[] = ['username', 'email', 'is_enabled', 'action'];
  dataSource!: MatTableDataSource<IUser>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _route: ActivatedRoute,
    private router: Router,
    private _apiService: OrgAdminServiceService,
    public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.loadStudentforClass();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadStudentforClass() {
    this._apiService.getUsersOfClassroomWithRole(this.classId, 'STUDENT').subscribe(
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

  openMapstudentDialog(){
    const dialogRef = this.dialog.open(OrgAdminClassMapStudent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result : ${result}`)
    })
  }
}


@Component({
  selector: 'org-admin-class-map-student',
  templateUrl: 'org-admin-class-map-student.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatTableModule, MatSlideToggleModule, MatCheckboxModule],
})
export class OrgAdminClassMapStudent implements OnInit {
  public notMappedTeachers: Array<IUser> = [];
  classId!: string;
  displayedColumns: string[] = ['selectbox', 'username', 'email', 'is_enabled'];

  constructor(private _apiService: OrgAdminServiceService, 
              private _route: ActivatedRoute,
              private router: Router,) { }

  ngOnInit(): void {
    this.classId = this.router.url.split('/').pop() as string;
    console.log(`classId : ${this.classId}`)

    this.loadStudentNotMappedToClassroom();
  }

  loadStudentNotMappedToClassroom(){
    this._apiService.getUsersOfClassroomNotMappedToClassroomWithRole(this.classId, 'Student').subscribe(
      res => {
        this.notMappedTeachers = res.data;
        console.log(this.notMappedTeachers);
      },
      error => {
        console.log(`error : ${error}`)
      }
    )
  }

  mapStudentToClass(){
    console.log(`mapStudentToClass clicked`);
  }
}