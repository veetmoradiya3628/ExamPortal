import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NodeStyleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { DeleteModelServiceService } from 'src/app/common/delete-model-service.service';
import { DeleteModelComponent } from 'src/app/common/delete-model/delete-model.component';
import { GeneralServiceService } from 'src/app/common/service/general-service.service';
import { IUser } from 'src/app/models/user.model';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  public users: IUser[] | undefined;

  displayedColumns: string[] = ['username', 'email', 'role', 'is_enabled', 'orgname', 'action'];
  dataSource!: MatTableDataSource<IUser>;
  // @Output() change: EventEmitter<MatSlideToggleChange>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _adminService: AdminServiceService, 
              private _generalService: GeneralServiceService,
              private _deleteModel: DeleteModelServiceService) { }

  ngOnInit(): void {
    this.loadUserData();
  }

  private loadUserData() {
    this._adminService.getUsers().subscribe(
      (res: any) => {
        this.users = res;
        console.log(this.users)
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  changeUserStauts(event: MatSlideToggleChange, userId: string) {
    console.log(`${event.checked}, ${userId}`)
    this._adminService.updateUserStatus(userId, event.checked).subscribe(
      (res: any) => {
        console.log(res)
        this._generalService.openSnackBar('User Status Changed Successfully', 'Ok')
        this.loadUserData();
      },
      (error: any) => {
        this._generalService.openSnackBar('Error occured while changing user status', 'Ok')
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

  deleteUserInfo(userId: string){
    this._deleteModel.openConfirmationDialog('Are you sure want to delete this User ?').then((result) => {
      if(result){
        this._adminService.deleteUser(userId).subscribe(
          (res: any) => {
            this._generalService.openSnackBar('User deleted successfully!!', 'OK')
            this.loadUserData();
          },
          (error : any) => {
            this._generalService.openSnackBar('User deletion failed', 'OK')
          }
        )
      }else{
        // user cancel the action
        return;
      }
    })
  }
}

