import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminHomePageComponent } from './admin/admin-home-page/admin-home-page.component';
import { HomePageComponent } from './common/home-page/home-page.component';
import { LoginComponent } from './common/login/login.component';
import { RegistrationComponent } from './common/registration/registration.component';

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
    component: AdminHomePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
