import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteModelServiceService } from 'src/app/common/delete-model-service.service';
import { GeneralServiceService } from 'src/app/common/service/general-service.service';
import { UserServiceService } from 'src/app/common/service/user-service.service';
import { OrgAdminServiceService } from 'src/app/services/org-admin-service.service';

@Component({
  selector: 'app-org-admin-student',
  templateUrl: './org-admin-student.component.html',
  styleUrls: ['./org-admin-student.component.scss']
})
export class OrgAdminStudentComponent implements OnInit {
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

  deleteStudent(userId: string){
    this._modelService.openConfirmationDialog('Are you sure want to delete this Student ?').then((result) => {
      if(result){
        this._apiService.deleteUser(userId).subscribe(
          (res: any) => {
            this._generalService.openSnackBar('Student deleted successfully!!', 'OK')
            this.loadstudentsForOrganization();
          },
          (error : any) => {
            this._generalService.openSnackBar('Student deletion failed', 'OK')
          }
        )
      }else{
        // user cancel the action
        return;
      }
    })
  }
}
