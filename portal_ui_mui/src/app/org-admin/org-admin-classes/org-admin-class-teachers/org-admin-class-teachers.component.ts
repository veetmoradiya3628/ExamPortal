import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggle, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/models/user.model';
import { OrgAdminServiceService } from 'src/app/services/org-admin-service.service';

@Component({
  selector: 'app-org-admin-class-teachers',
  templateUrl: './org-admin-class-teachers.component.html',
  styleUrls: ['./org-admin-class-teachers.component.scss']
})
export class OrgAdminClassTeachersComponent implements OnInit {
  public mappedTeachers: Array<IUser> = [];

  @Input() classId!: string;

  displayedColumns: string[] = ['username', 'email', 'is_enabled', 'action'];
  public teacherDataSource!: MatTableDataSource<IUser>;

  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _route: ActivatedRoute,
    private router: Router,
    private _apiService: OrgAdminServiceService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadTeachesForClass();
  }

  loadTeachesForClass() {
    this._apiService.getUsersOfClassroomWithRole(this.classId, 'TEACHER').subscribe(
      (res: any) => {
        this.mappedTeachers = res.data;
        console.log(this.mappedTeachers);
        // teacher data populate to the teacher table
        this.teacherDataSource = new MatTableDataSource(this.mappedTeachers);
        this.teacherDataSource.paginator = this.paginator;
        this.teacherDataSource.sort = this.sort;
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.teacherDataSource.filter = filterValue.trim().toLowerCase();

    if (this.teacherDataSource.paginator) {
      this.teacherDataSource.paginator.firstPage();
    }
  }

  openMapTeacherDialog() {
    const dialogRef = this.dialog.open(OrgAdminClassMapTeacher);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result : ${result}`)
    })
  }
}


@Component({
  selector: 'org-admin-class-map-teacher',
  templateUrl: 'org-admin-class-map-teacher.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatTableModule, MatSlideToggleModule, MatCheckboxModule],
})
export class OrgAdminClassMapTeacher implements OnInit {
  public notMappedTeachers: Array<IUser> = [];
  classId!: string;
  displayedColumns: string[] = ['selectbox', 'username', 'email', 'is_enabled'];

  constructor(private _apiService: OrgAdminServiceService, 
              private _route: ActivatedRoute,
              private router: Router,) { }

  ngOnInit(): void {
    this.classId = this.router.url.split('/').pop() as string;
    console.log(`classId : ${this.classId}`)

    this.loadTeacherNotMappedToClassroom();
  }

  loadTeacherNotMappedToClassroom(){
    this._apiService.getUsersOfClassroomNotMappedToClassroomWithRole(this.classId, 'Teacher').subscribe(
      res => {
        this.notMappedTeachers = res.data;
        console.log(this.notMappedTeachers);
      },
      error => {
        console.log(`error : ${error}`)
      }
    )
  }

  mapTeacherToClass(){
    console.log(`mapTeacherToClass clicked`);
  }
}