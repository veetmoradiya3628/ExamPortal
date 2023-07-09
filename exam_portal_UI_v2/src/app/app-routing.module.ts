import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomePageComponent } from './admin/admin-home-page/admin-home-page.component';
import { HomePageComponent } from './common/home-page/home-page.component';
import { LoginComponent } from './common/login/login.component';
import { RegistrationComponent } from './common/registration/registration.component';
import { sysAdminRoutes } from './admin/sys-admin-routes';
import { HomeOrganizationAdminComponent } from './organization/home-organization-admin/home-organization-admin.component';
import { orgAdminRoutes } from './organization/org-admin-routes';
import {HomeTeacherComponent} from "./teacher/home-teacher/home-teacher.component";
import {teacherRoutes} from "./teacher/teacher.routes";
import {HomeStudentComponent} from "./student/home-student/home-student.component";
import {studentRoutes} from "./student/student.routes";

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: AdminHomePageComponent,
    children: [
      ...sysAdminRoutes
    ]
  },
  {
    path: 'org-admin',
    component: HomeOrganizationAdminComponent,
    children: [
      ...orgAdminRoutes
    ]
  },
  {
    path: 'teacher',
    component: HomeTeacherComponent,
    children: [
      ...teacherRoutes
    ]
  },
  {
    path: 'student',
    component: HomeStudentComponent,
    children: [
      ...studentRoutes
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
