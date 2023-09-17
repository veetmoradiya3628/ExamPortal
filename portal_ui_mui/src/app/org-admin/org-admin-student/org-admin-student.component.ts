import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrgAdminServiceService } from 'src/app/services/org-admin-service.service';

@Component({
  selector: 'app-org-admin-student',
  templateUrl: './org-admin-student.component.html',
  styleUrls: ['./org-admin-student.component.scss']
})
export class OrgAdminStudentComponent implements OnInit {
    // this will be dynamic once we make authentication flow & org admin login
  orgId: string = 'a77f5d7b-c50d-418d-8c66-3814049ca386';
  students: Array<any> = new Array<any>();

  dataSource!: MatTableDataSource<any>;

  displayedColumns: string[] = ['username', 'email', 'fullname', 'role', 'is_enabled', 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _apiService: OrgAdminServiceService) { }

  ngOnInit(): void {
    this.loadstudentsForOrganization();
  }

  loadstudentsForOrganization() {
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
}
