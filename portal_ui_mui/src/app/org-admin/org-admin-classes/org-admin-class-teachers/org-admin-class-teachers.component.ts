import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggle, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteModelServiceService } from 'src/app/common/delete-model-service.service';
import { GeneralServiceService } from 'src/app/common/service/general-service.service';
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
    public dialog: MatDialog,
    public _generalService: GeneralServiceService,
    public _deleteModelService: DeleteModelServiceService) { }

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
      this.loadTeachesForClass();
    })
  }

  deleteTeacherMapping(userId: string) {
    console.log(`delete mapping called for ${userId}`)
    this._deleteModelService.openConfirmationDialog('Are you sure want to delete this Teacher Mapping ?').then((result) => {
      if(result){
        this._apiService.unmapUserToClassroom(this.classId, userId).subscribe(
          (res: any) => {
            console.log(res)
            this._generalService.openSnackBar('Teacher unmapped with classroom successfully', 'Ok')
            this.loadTeachesForClass();
          },
          (error: any) => {
            console.log(`error orrcured while unmapping user ${error}`)
            this._generalService.openSnackBar('Error occured while unmapping Teacher with classroom', 'Ok')
          }
        )
      }else{
        // user cancel the action
        return;
      }
    })
  }
}


@Component({
  selector: 'org-admin-class-map-teacher',
  templateUrl: 'org-admin-class-map-teacher.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatTableModule, MatSlideToggleModule, MatCheckboxModule, FormsModule],
})
export class OrgAdminClassMapTeacher implements OnInit {
  public notMappedTeachers: Array<IUser> = [];
  classId!: string;
  displayedColumns: string[] = ['select', 'position', 'username', 'email', 'is_enabled'];
  dataSource!: any;
  selection!: any;

  constructor(private _apiService: OrgAdminServiceService,
    private _route: ActivatedRoute,
    private router: Router,
    private _orgAdminService: OrgAdminServiceService,
    private _generalService: GeneralServiceService) { }

  ngOnInit(): void {
    this.classId = this.router.url.split('/').pop() as string;
    console.log(`classId : ${this.classId}`)

    this.loadTeacherNotMappedToClassroom();
  }

  loadTeacherNotMappedToClassroom() {
    this._apiService.getUsersOfClassroomNotMappedToClassroomWithRole(this.classId, 'Teacher').subscribe(
      res => {
        this.notMappedTeachers = res.data;
        console.log(this.notMappedTeachers);
        for (let index = 0; index < this.notMappedTeachers.length; index++) {
          this.notMappedTeachers[index]['position'] = index + 1;
          this.notMappedTeachers[index]['selected'] = false;
        }
        console.log(this.notMappedTeachers);
        this.dataSource = new MatTableDataSource<IUser>(this.notMappedTeachers);
        this.selection = new SelectionModel<IUser>(true, []);
      },
      error => {
        console.log(`error : ${error}`)
      }
    )
  }

  mapTeacherToClass() {
    let correctCnt = 0, errorCnt = 0;
    console.log(`mapTeacherToClass clicked`);
    console.log(this.dataSource);
    this.notMappedTeachers.forEach((user: any) => {
      console.log(user.selected)
      if(user.selected){
        console.log(user.userId)
        let reqObj = {
          'classroomId' : this.classId,
          'userId': user.userId
        }
        this._orgAdminService.mapUserToClassroom(reqObj).subscribe(
          (res: any) => {
            console.log(res)
            correctCnt++;
          },
          (error: any) => {
            console.log(error)
            errorCnt++;
          }
        )
      }
    });
    this._generalService.openSnackBar('Teacher mapped to classroom', 'Ok')
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: IUser): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}