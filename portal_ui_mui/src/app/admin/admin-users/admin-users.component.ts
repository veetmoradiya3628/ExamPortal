import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NodeStyleEventEmitter } from 'rxjs/internal/observable/fromEvent';
import { IUser } from 'src/app/models/user.model';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  public users: IUser[] | undefined;

  displayedColumns: string[] = ['username', 'email', 'role', 'is_enabled', 'action'];
  dataSource!: MatTableDataSource<IUser>;
  // @Output() change: EventEmitter<MatSlideToggleChange>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _adminService: AdminServiceService) { }

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
        this.loadUserData();
      },
      (error: any) => {
        console.log('error occured while updating user status')
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
function Output(): (target: AdminUsersComponent, propertyKey: "change") => void {
  throw new Error('Function not implemented.');
}

