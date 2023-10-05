import { Routes } from "@angular/router";
import { TeacherDashboardComponent } from "./teacher-dashboard/teacher-dashboard.component";
import { TeacherQuizzesComponent } from "./teacher-quizzes/teacher-quizzes.component";
import { TeacherClassesComponent } from "./teacher-classes/teacher-classes.component";
import { TeacherStudentsComponent } from "./teacher-students/teacher-students.component";
import { TeacherProfileComponent } from "./teacher-profile/teacher-profile.component";

export const teacherRoutes: Routes = [
    {
        path: '',
        component: TeacherDashboardComponent,
        pathMatch: 'full'
    },
    {
        path: 'quizzes',
        component: TeacherQuizzesComponent,
        pathMatch: 'full'
    },
    {
        path: 'classes',
        component: TeacherClassesComponent,
        pathMatch: 'full'
    },
    {
        path: 'students',
        component: TeacherStudentsComponent,
        pathMatch: 'full'
    },
    {
        path: 'profile',
        component: TeacherProfileComponent,
        pathMatch: 'full'
    }
]