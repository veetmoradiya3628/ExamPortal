import { Routes } from "@angular/router";
import { HomeOrganizationAdminComponent } from "./home-organization-admin/home-organization-admin.component";
import { OrgAdminDashboardComponent } from "./org-admin-dashboard/org-admin-dashboard.component";
import { UserManagementOrgComponent } from "./user-management-org/user-management-org.component";

export const orgAdminRoutes: Routes = [
    {
        path: '',
        component: OrgAdminDashboardComponent,
        pathMatch: 'full'
    },
    {
        path: 'users',
        component: UserManagementOrgComponent,
        pathMatch: 'full'
    }
]
