import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminHomePageComponent } from './admin/admin-home-page/admin-home-page.component';
import { HomePageComponent } from './common/home-page/home-page.component';
import { LoginComponent } from './common/login/login.component';
import { RegistrationComponent } from './common/registration/registration.component';
import { OrganizationsComponent } from './admin/organizations/organizations.component';
import { sysAdminRoutes } from './admin/sys-admin-routes';
import { HomeOrganizationAdminComponent } from './organization/home-organization-admin/home-organization-admin.component';
import { orgAdminRoutes } from './organization/org-admin-routes';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
