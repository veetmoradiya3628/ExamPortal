import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
    private _apiService: OrgAdminServiceService){}

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


}
