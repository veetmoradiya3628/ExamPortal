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
    SysAdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
