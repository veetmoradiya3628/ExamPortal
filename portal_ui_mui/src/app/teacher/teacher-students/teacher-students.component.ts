import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteModelServiceService } from 'src/app/common/delete-model-service.service';
import { GeneralServiceService } from 'src/app/common/service/general-service.service';
import { UserServiceService } from 'src/app/common/service/user-service.service';
import { OrgAdminServiceService } from 'src/app/services/org-admin-service.service';

@Component({
  selector: 'app-teacher-students',
  templateUrl: './teacher-students.component.html',
  styleUrls: ['./teacher-students.component.scss']
})
export class TeacherStudentsComponent implements OnInit {

  // this will be dynamic once we make authentication flow & org admin login
  orgId: string = '';
  students: Array<any> = new Array<any>();

  dataSource!: MatTableDataSource<any>;

  displayedColumns: string[] = ['username', 'email', 'fullname', 'role', 'is_enabled', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _apiService: OrgAdminServiceService,
    private _userService: UserServiceService,
    private _generalService: GeneralServiceService,
    private _modelService: DeleteModelServiceService) { }

  ngOnInit(): void {
    this.orgId = this._userService.getLoginUserOrganizationId();
    this.loadStudentsForOrganization();
  }

  loadStudentsForOrganization() {
    this._apiService.getUsersOfOrganizationByRolename(this.orgId, 'STUDENT').subscribe(
      (res: any) => {
        this.students = res.data;
        this.dataSource = new MatTableDataSource(this.students);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(res);
      },
      (error: any) => {
        console.log(error);
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

  deleteStudent(userId: string) {
    console.log(`Yet to implement...`)
  }

}
