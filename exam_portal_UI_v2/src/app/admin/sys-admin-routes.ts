import { Routes } from "@angular/router";
import { OrganizationsComponent } from "./organizations/organizations.component";
import { UserManagementComponent } from "./user-management/user-management.component";
import { SysAdminProfileComponent } from "./sys-admin-profile/sys-admin-profile.component";
import { SysAdminDashboardComponent } from "./sys-admin-dashboard/sys-admin-dashboard.component";
import {AddOrganizationComponent} from "./add-organization/add-organization.component";

export const sysAdminRoutes: Routes = [
    {
        path: '',
        component: SysAdminDashboardComponent,
        pathMatch: 'full'
    },
    {
        path: 'organization',
        component: OrganizationsComponent,
        pathMatch: 'full'
    },
    {
        path: 'users',
        component: UserManagementComponent,
        pathMatch: 'full'
    },
    {
        path: 'profile',
        component: SysAdminProfileComponent,
        pathMatch: 'full'
    },
    {
        path: 'add-organization',
      component: AddOrganizationComponent,
      pathMatch: 'full'
    }
]
