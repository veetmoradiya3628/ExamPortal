import { Routes } from "@angular/router";
import { StudentDashboardComponent } from "./student-dashboard/student-dashboard.component";
import { StudentQuizzesComponent } from "./student-quizzes/student-quizzes.component";
import { StudentAttemptsComponent } from "./student-attempts/student-attempts.component";
import { StudentClassesComponent } from "./student-classes/student-classes.component";
import { StudentProfileComponent } from "./student-profile/student-profile.component";

export const studentRoutes: Routes = [
    {
        path: '',
        component: StudentDashboardComponent,
        pathMatch: 'full'
    },
    {
        path: 'quizzes',
        component: StudentQuizzesComponent,
        pathMatch: 'full'
    },
    {
        path: 'quiz-attampts',
        component: StudentAttemptsComponent,
        pathMatch: 'full'
    },
    {
        path: 'classes',
        component: StudentClassesComponent,
        pathMatch: 'full'
    },
    {
        path: 'profile',
        component: StudentProfileComponent,
        pathMatch: 'full'
    }
]