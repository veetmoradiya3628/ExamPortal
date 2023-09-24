import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
    private _apiService: OrgAdminServiceService) {

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

}
