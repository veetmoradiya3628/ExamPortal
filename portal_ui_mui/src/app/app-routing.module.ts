import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './common/home-page/home-page.component';
import { LoginComponent } from './common/login/login.component';
import { RegisterComponent } from './common/register/register.component';
import { AdminHomePageComponent } from './admin/admin-home-page/admin-home-page.component';
import { sysAdminRoutes } from './admin/admin.routes';
import { OrgAdminHomePageComponent } from './org-admin/org-admin-home-page/org-admin-home-page.component';
import { orgAdminRoutes } from './org-admin/org-admin.routes';
import { TeacherHomePageComponent } from './teacher/teacher-home-page/teacher-home-page.component';
import { teacherRoutes } from './teacher/teacher.routes';
import { StudentHomePageComponent } from './student/student-home-page/student-home-page.component';
import { studentRoutes } from './student/student.routes';
import { QuizAttemptComponent } from './attempt/quiz-attempt/quiz-attempt.component';

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
    component: RegisterComponent,
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
    component: OrgAdminHomePageComponent,
    children: [
      ...orgAdminRoutes
    ]
  },
  {
    path: 'teacher',
    component: TeacherHomePageComponent,
    children: [
      ...teacherRoutes
    ]
  },
  {
    path: 'student',
    component: StudentHomePageComponent,
    children: [
      ...studentRoutes
    ]
  },
  {
    path: 'quiz-attempt/:quiz-id/question/:question-id',
    component: QuizAttemptComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
