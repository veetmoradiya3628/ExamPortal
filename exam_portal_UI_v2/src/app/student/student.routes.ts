import {Routes} from "@angular/router";
import {StudentDashboardComponent} from "./student-dashboard/student-dashboard.component";
import { StudentQuizzesComponent } from "./student-quizzes/student-quizzes.component";
import { StudentQuizAttamptsComponent } from "./student-quiz-attampts/student-quiz-attampts.component";
import { StudentClassesComponent } from "./student-classes/student-classes.component";
import { StudentProfileComponent } from "./student-profile/student-profile.component";

export const studentRoutes: Routes = [
  {
    path: '',
    component: StudentDashboardComponent,
    pathMatch: "full"
  },
  {
    path: 'quizzes',
    component: StudentQuizzesComponent
  },
  {
    path: 'quiz-attampts',
    component: StudentQuizAttamptsComponent
  },
  {
    path: 'classes',
    component: StudentClassesComponent
  },
  {
    path: 'profile',
    component: StudentProfileComponent
  }
]
