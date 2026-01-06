import { Routes } from '@angular/router';
import { Users } from './user/users/users';
import { NoTask } from './tasks/no-task/no-task';
import { UserTasks } from './user/user-tasks/user-tasks';
import { NotFound } from './not-found/not-found';
import { UserDetails } from './user/user-details/user-details';
import { Login } from './login/login/login';
import { Register } from './login/register/register';
import { authGuard } from './auth-guard';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    {
        path: '',
        component: Dashboard,
        canActivate: [authGuard],
        children: [
            { path: 'users/:id', component: UserDetails },
            { path: '', redirectTo: 'users', pathMatch: 'full' }
        ]
    },
    { path: '', component: NoTask, pathMatch: 'full' },
    { path: 'notfound', component: NotFound },
    { path: '**', redirectTo: 'notfound' }
];
