import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Organization } from 'src/app/models/organization.model';
import { AdminServiceService } from 'src/app/services/admin-service.service';

@Component({
  selector: 'app-admin-organization',
  templateUrl: './admin-organization.component.html',
  styleUrls: ['./admin-organization.component.scss']
})
export class AdminOrganizationComponent implements OnInit {
  public organizations: Organization[] | undefined;

  displayedColumns: string[] = ['orgName', 'orgDescription', 'createdAt', 'updatedAt', 'Action'];
  dataSource!: MatTableDataSource<Organization>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _adminService: AdminServiceService) {
  }

  ngOnInit(): void {
    this.loadOrganizationData();
  }

  private loadOrganizationData() {
    this._adminService.getOrganization().subscribe(
      (res: any) => {
        this.organizations = res;
        this.dataSource = new MatTableDataSource(this.organizations);
      },
      (error: any) => {
        throw new Error("Error while loading organizations " + error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

