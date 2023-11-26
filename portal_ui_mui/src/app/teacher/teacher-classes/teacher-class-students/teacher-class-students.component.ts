import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteModelServiceService } from 'src/app/common/delete-model-service.service';
import { GeneralServiceService } from 'src/app/common/service/general-service.service';
import { IUser } from 'src/app/models/user.model';
import { OrgAdminClassMapStudent } from 'src/app/org-admin/org-admin-classes/org-admin-class-students/org-admin-class-students.component';
import { OrgAdminServiceService } from 'src/app/services/org-admin-service.service';

@Component({
  selector: 'app-teacher-class-students',
  templateUrl: './teacher-class-students.component.html',
  styleUrls: ['./teacher-class-students.component.scss']
})
export class TeacherClassStudentsComponent implements OnInit {
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
      if (result) {
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
      } else {
        // user cancel the action
        return;
      }
    })
  }
}
