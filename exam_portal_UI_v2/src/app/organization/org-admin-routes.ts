import { Routes } from "@angular/router";
import { HomeOrganizationAdminComponent } from "./home-organization-admin/home-organization-admin.component";
import { OrgAdminDashboardComponent } from "./org-admin-dashboard/org-admin-dashboard.component";
import { OrgClassesMngtComponent } from "./org-classes-mngt/org-classes-mngt.component";
import { OrgClassDetailsComponent } from "./org-class-details/org-class-details.component";
import { OrgTeacherMngtComponent } from "./org-teacher-mngt/org-teacher-mngt.component";
import { OrgStudentMngtComponent } from "./org-student-mngt/org-student-mngt.component";

export const orgAdminRoutes: Routes = [
    {
        path: '',
        component: OrgAdminDashboardComponent,
        pathMatch: 'full'
    },
    {
        path: 'classes',
        component: OrgClassesMngtComponent,
        pathMatch: 'full'
    },
    {
        path: 'teacher',
        component: OrgTeacherMngtComponent,
        pathMatch: 'full'
    },
    {
        path: 'student',
        component: OrgStudentMngtComponent,
        pathMatch: 'full'
    },
    {
        path: 'class-details/:id',
        component: OrgClassDetailsComponent,
    }
]
