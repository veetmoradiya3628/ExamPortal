import { Routes } from "@angular/router";
import { OrgAdminDashboardComponent } from "./org-admin-dashboard/org-admin-dashboard.component";
import { OrgAdminClassesComponent } from "./org-admin-classes/org-admin-classes.component";
import { OrgAdminTeacherComponent } from "./org-admin-teacher/org-admin-teacher.component";
import { OrgAdminStudentComponent } from "./org-admin-student/org-admin-student.component";
import { OrgAdminProfileComponent } from "./org-admin-profile/org-admin-profile.component";
import { OrgAdminClassDetailsComponent } from "./org-admin-classes/org-admin-class-details/org-admin-class-details.component";
import { OrgAdminCreateClassComponent } from "./org-admin-create-class/org-admin-create-class.component";

export const orgAdminRoutes: Routes = [
    {
        path: '',
        component: OrgAdminDashboardComponent,
        pathMatch: 'full'
    },
    {
        path: 'classes',
        component: OrgAdminClassesComponent,
        pathMatch: 'full'
    },
    {
        path: 'teacher',
        component: OrgAdminTeacherComponent,
        pathMatch: 'full'
    },
    {
        path: 'student',
        component: OrgAdminStudentComponent,
        pathMatch: 'full'
    },
    {
        path: 'profile',
        component: OrgAdminProfileComponent,
        pathMatch: 'full'
    },
    {
        path: 'class-details/:id',
        component: OrgAdminClassDetailsComponent,
        pathMatch: 'full'
    },
    {
        path: ':id/create-class',
        component: OrgAdminCreateClassComponent,
        pathMatch: 'full'
    }
]