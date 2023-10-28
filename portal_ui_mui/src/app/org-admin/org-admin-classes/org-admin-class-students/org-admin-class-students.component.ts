import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteModelServiceService } from 'src/app/common/delete-model-service.service';
import { GeneralServiceService } from 'src/app/common/service/general-service.service';
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
    private _apiService: OrgAdminServiceService,
    public dialog: MatDialog,
    public _generalService: GeneralServiceService,
    public _deleteModelService: DeleteModelServiceService) {

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

  openMapstudentDialog() {
    const dialogRef = this.dialog.open(OrgAdminClassMapStudent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result : ${result}`)
      this.loadStudentforClass();
    })
  }

  deleteStudentMapping(userId: string) {
    console.log(`delete mapping called for ${userId}`)
    this._deleteModelService.openConfirmationDialog('Are you sure want to delete this Student Mapping ?').then((result) => {
      if(result){
        this._apiService.unmapUserToClassroom(this.classId, userId).subscribe(
          (res: any) => {
            console.log(res)
            this._generalService.openSnackBar('Student unmapped with classroom successfully', 'Ok')
            this.loadStudentforClass();
          },
          (error: any) => {
            console.log(`error orrcured while unmapping user ${error}`)
            this._generalService.openSnackBar('Error occured while unmapping Student with classroom', 'Ok')
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
  selector: 'org-admin-class-map-student',
  templateUrl: 'org-admin-class-map-student.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatTableModule, MatSlideToggleModule, MatCheckboxModule, FormsModule],
})
export class OrgAdminClassMapStudent implements OnInit {
  public notMappedStudents: Array<IUser> = [];
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

    this.loadStudentNotMappedToClassroom();
  }

  loadStudentNotMappedToClassroom() {
    this._apiService.getUsersOfClassroomNotMappedToClassroomWithRole(this.classId, 'Student').subscribe(
      res => {
        this.notMappedStudents = res.data;
        console.log(this.notMappedStudents);
        for (let index = 0; index < this.notMappedStudents.length; index++) {
          this.notMappedStudents[index]['position'] = index + 1;
          this.notMappedStudents[index]['selected'] = false;
        }
        console.log(this.notMappedStudents);
        this.dataSource = new MatTableDataSource<IUser>(this.notMappedStudents);
        this.selection = new SelectionModel<IUser>(true, []);
      },
      error => {
        console.log(`error : ${error}`)
      }
    )
  }

  mapStudentToClass() {
    console.log(`mapStudentToClass clicked`);
    console.log(this.dataSource);
    this.notMappedStudents.forEach((user: any) => {
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
          },
          (error: any) => {
            console.log(error)
          }
        )
      }
    });
    this._generalService.openSnackBar('Student mapped to classroom', 'Ok')
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