import {Routes} from "@angular/router";
import {TeacherDashboardComponent} from "./teacher-dashboard/teacher-dashboard.component";
import { TeacherQuizzesComponent } from "./teacher-quizzes/teacher-quizzes.component";
import { TeacherClassesComponent } from "./teacher-classes/teacher-classes.component";
import { TeacherStudentsComponent } from "./teacher-students/teacher-students.component";
import { TeacherProfileComponent } from "./teacher-profile/teacher-profile.component";
import {TeacherQuizDetailsComponent} from "./teacher-quizzes/teacher-quiz-details/teacher-quiz-details.component";

export const teacherRoutes: Routes = [
  {
    path: '',
    component: TeacherDashboardComponent,
    pathMatch: 'full'
  },
  {
    path: 'quizzes',
    component: TeacherQuizzesComponent,
  },
  {
    path: 'quizzes/:id/details',
    component: TeacherQuizDetailsComponent
  },
  {
    path: 'classes',
    component: TeacherClassesComponent
  },
  {
    path: 'students',
    component: TeacherStudentsComponent
  },
  {
    path: 'profile',
    component: TeacherProfileComponent
  }
]
