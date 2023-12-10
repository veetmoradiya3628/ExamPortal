import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeleteModelServiceService } from 'src/app/common/delete-model-service.service';
import { GeneralServiceService } from 'src/app/common/service/general-service.service';
import { UserServiceService } from 'src/app/common/service/user-service.service';
import { OrgAdminServiceService } from 'src/app/services/org-admin-service.service';

@Component({
  selector: 'app-org-admin-teacher',
  templateUrl: './org-admin-teacher.component.html',
  styleUrls: ['./org-admin-teacher.component.scss']
})
export class OrgAdminTeacherComponent implements OnInit {

  // this will be dynamic once we make authentication flow & org admin login
  orgId: string = '';
  teachers: Array<any> = new Array<any>();

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
    this.loadTeachersForOrganization();
  }

  loadTeachersForOrganization() {
    this._apiService.getUsersOfOrganizationByRolename(this.orgId, 'TEACHER').subscribe(
      (res: any) => {
        this.teachers = res.data;
        this.dataSource = new MatTableDataSource(this.teachers);
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

  deleteTeacher(userId: string){
    this._modelService.openConfirmationDialog('Are you sure want to delete this Teacher ?').then((result) => {
      if(result){
        this._apiService.deleteUser(userId).subscribe(
          (res: any) => {
            this._generalService.openSnackBar('Teacher deleted successfully!!', 'OK')
            this.loadTeachersForOrganization();
          },
          (error : any) => {
            this._generalService.openSnackBar('Teacher deletion failed', 'OK')
          }
        )
      }else{
        // user cancel the action
        return;
      }
    })
  }

}
