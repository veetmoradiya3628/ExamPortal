import {Routes} from "@angular/router";
import {StudentDashboardComponent} from "./student-dashboard/student-dashboard.component";

export const studentRoutes: Routes = [
  {
    path: '',
    component: StudentDashboardComponent,
    pathMatch: "full"
  },
]
