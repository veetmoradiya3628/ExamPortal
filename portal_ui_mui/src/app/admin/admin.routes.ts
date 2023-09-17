import { Routes } from "@angular/router";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { AdminOrganizationComponent } from "./admin-organization/admin-organization.component";
import { AdminUsersComponent } from "./admin-users/admin-users.component";
import { AdminProfileComponent } from "./admin-profile/admin-profile.component";
import { AdminAddOrganizationComponent } from "./admin-add-organization/admin-add-organization.component";
import { AdminCreateUserComponent } from "./admin-create-user/admin-create-user.component";

export const sysAdminRoutes: Routes = [
    {
        path: '',
        component: AdminDashboardComponent,
        pathMatch: 'full'
    },
    {
        path: 'organization',
        component: AdminOrganizationComponent,
        pathMatch: 'full'
    },
    {
        path: 'users',
        component: AdminUsersComponent,
        pathMatch: 'full'
    },
    {
        path: 'profile',
        component: AdminProfileComponent,
        pathMatch: 'full'
    }, 
    {
        path: 'add-organization',
        component: AdminAddOrganizationComponent,
        pathMatch: 'full'
    },
    {
        path: 'add-user',
        component: AdminCreateUserComponent,
        pathMatch: 'full'
    }
]