import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { AdminHomePageComponent } from './admin/admin-home-page/admin-home-page.component';
import { HomePageComponent } from './common/home-page/home-page.component';
import { AdminSidePageComponent } from './admin/admin-side-page/admin-side-page.component';
import { LoginComponent } from './common/login/login.component';
import { RegistrationComponent } from './common/registration/registration.component';
import { RouterModule } from '@angular/router';
import { OrganizationsComponent } from './admin/organizations/organizations.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { SysAdminProfileComponent } from './admin/sys-admin-profile/sys-admin-profile.component';
import { SysAdminDashboardComponent } from './admin/sys-admin-dashboard/sys-admin-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { AddOrganizationComponent } from './admin/add-organization/add-organization.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AddUserComponent } from './admin/add-user/add-user.component';
import { HomeOrganizationAdminComponent } from './organization/home-organization-admin/home-organization-admin.component';
import { OrgAdminSidePageComponent } from './organization/org-admin-side-page/org-admin-side-page.component';
import { OrgAdminDashboardComponent } from './organization/org-admin-dashboard/org-admin-dashboard.component';
import { HomeTeacherComponent } from './teacher/home-teacher/home-teacher.component';
import { TeacherDashboardComponent } from './teacher/teacher-dashboard/teacher-dashboard.component';
import { TeacherSidePageComponent } from './teacher/teacher-side-page/teacher-side-page.component';
import { HomeStudentComponent } from './student/home-student/home-student.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { StudentSideBarComponent } from './student/student-side-bar/student-side-bar.component';
import { OrgClassesMngtComponent } from './organization/org-classes-mngt/org-classes-mngt.component';
import { OrgClassDetailsComponent } from './organization/org-class-details/org-class-details.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { OrgTeacherMngtComponent } from './organization/org-teacher-mngt/org-teacher-mngt.component';
import { OrgStudentMngtComponent } from './organization/org-student-mngt/org-student-mngt.component';
import { ClassQuizComponent } from './organization/org-class-details/class-quiz/class-quiz.component';
import { ClassStudentComponent } from './organization/org-class-details/class-student/class-student.component';
import { ClassTeacherComponent } from './organization/org-class-details/class-teacher/class-teacher.component';
import { ClassPostSectionComponent } from './organization/org-class-details/class-post-section/class-post-section.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AdminHomePageComponent,
    HomePageComponent,
    AdminSidePageComponent,
    LoginComponent,
    RegistrationComponent,
    OrganizationsComponent,
    UserManagementComponent,
    SysAdminProfileComponent,
    SysAdminDashboardComponent,
    AddOrganizationComponent,
    AddUserComponent,
    HomeOrganizationAdminComponent,
    OrgAdminSidePageComponent,
    OrgAdminDashboardComponent,
    HomeTeacherComponent,
    TeacherDashboardComponent,
    TeacherSidePageComponent,
    HomeStudentComponent,
    StudentDashboardComponent,
    StudentSideBarComponent,
    OrgClassesMngtComponent,
    OrgClassDetailsComponent,
    OrgTeacherMngtComponent,
    OrgStudentMngtComponent,
    ClassQuizComponent,
    ClassStudentComponent,
    ClassTeacherComponent,
    ClassPostSectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    CKEditorModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
