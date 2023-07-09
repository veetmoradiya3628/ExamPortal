import { Routes } from "@angular/router";
import { HomeOrganizationAdminComponent } from "./home-organization-admin/home-organization-admin.component";
import { OrgAdminDashboardComponent } from "./org-admin-dashboard/org-admin-dashboard.component";
import { UserManagementOrgComponent } from "./user-management-org/user-management-org.component";
import { OrgClassesMngtComponent } from "./org-classes-mngt/org-classes-mngt.component";
import { OrgClassDetailsComponent } from "./org-class-details/org-class-details.component";

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
    }, 
    {
        path: 'classes',
        component: OrgClassesMngtComponent,
        pathMatch: 'full'
    },
    {
        path: 'class-details/:id',
        component: OrgClassDetailsComponent,
    }
]
