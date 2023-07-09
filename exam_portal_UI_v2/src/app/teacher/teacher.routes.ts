import {Routes} from "@angular/router";
import {TeacherDashboardComponent} from "./teacher-dashboard/teacher-dashboard.component";

export const teacherRoutes: Routes = [
  {
    path: '',
    component: TeacherDashboardComponent,
    pathMatch: 'full'
  },
]
