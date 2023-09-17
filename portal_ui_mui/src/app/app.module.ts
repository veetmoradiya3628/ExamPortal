import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AddressComponentComponent } from './test/address-component/address-component.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationComponentComponent } from './test/navigation-component/navigation-component.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { TableComponentComponent } from './test/table-component/table-component.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DashboardComponentComponent } from './test/dashboard-component/dashboard-component.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { TreeComponenetComponent } from './test/tree-componenet/tree-componenet.component';
import { MatTreeModule } from '@angular/material/tree';
import { DragDropComponentComponent } from './test/drag-drop-component/drag-drop-component.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HeaderComponent } from './common/header/header.component';
import { RegisterComponent } from './common/register/register.component';
import { LoginComponent } from './common/login/login.component';
import { HomePageComponent } from './common/home-page/home-page.component';
import { AdminHomePageComponent } from './admin/admin-home-page/admin-home-page.component';
import { OrgAdminHomePageComponent } from './org-admin/org-admin-home-page/org-admin-home-page.component';
import { TeacherHomePageComponent } from './teacher/teacher-home-page/teacher-home-page.component';
import { StudentHomePageComponent } from './student/student-home-page/student-home-page.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminSidebarComponent } from './admin/admin-sidebar/admin-sidebar.component';
import { AdminOrganizationComponent } from './admin/admin-organization/admin-organization.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TestComponentComponent } from './test/test-component/test-component.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AdminAddOrganizationComponent } from './admin/admin-add-organization/admin-add-organization.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminCreateUserComponent } from './admin/admin-create-user/admin-create-user.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { OrgAdminSidebarComponent } from './org-admin/org-admin-sidebar/org-admin-sidebar.component';
import { OrgAdminDashboardComponent } from './org-admin/org-admin-dashboard/org-admin-dashboard.component';
import { OrgAdminClassesComponent } from './org-admin/org-admin-classes/org-admin-classes.component';
import { OrgAdminTeacherComponent } from './org-admin/org-admin-teacher/org-admin-teacher.component';
import { OrgAdminStudentComponent } from './org-admin/org-admin-student/org-admin-student.component';
import { OrgAdminProfileComponent } from './org-admin/org-admin-profile/org-admin-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    AddressComponentComponent,
    NavigationComponentComponent,
    TableComponentComponent,
    DashboardComponentComponent,
    TreeComponenetComponent,
    DragDropComponentComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    HomePageComponent,
    AdminHomePageComponent,
    OrgAdminHomePageComponent,
    TeacherHomePageComponent,
    StudentHomePageComponent,
    AdminDashboardComponent,
    AdminSidebarComponent,
    AdminOrganizationComponent,
    AdminUsersComponent,
    AdminProfileComponent,
    TestComponentComponent,
    AdminAddOrganizationComponent,
    AdminCreateUserComponent,
    OrgAdminSidebarComponent,
    OrgAdminDashboardComponent,
    OrgAdminClassesComponent,
    OrgAdminTeacherComponent,
    OrgAdminStudentComponent,
    OrgAdminProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatMenuModule,
    MatTreeModule,
    MatFormFieldModule,
    MatSnackBarModule,
    DragDropModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }