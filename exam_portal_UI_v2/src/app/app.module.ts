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
import {ReactiveFormsModule} from "@angular/forms";
import { AddUserComponent } from './admin/add-user/add-user.component';
import { HomeOrganizationAdminComponent } from './organization/home-organization-admin/home-organization-admin.component';
import { UserManagementOrgComponent } from './organization/user-management-org/user-management-org.component';
import { OrgAdminSidePageComponent } from './organization/org-admin-side-page/org-admin-side-page.component';
import { OrgAdminDashboardComponent } from './organization/org-admin-dashboard/org-admin-dashboard.component';
import { HomeTeacherComponent } from './teacher/home-teacher/home-teacher.component';

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
    UserManagementOrgComponent,
    OrgAdminSidePageComponent,
    OrgAdminDashboardComponent,
    HomeTeacherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
