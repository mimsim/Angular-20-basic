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
        component: Dashboard, // layout
        canActivate: [authGuard],
        // children: [
        //     { path: 'users', component: Users }, // десният панел
        //     { path: '', redirectTo: 'users', pathMatch: 'full' }
        // ]
    },
    { path: 'users', component: Users, canActivate: [authGuard] },
    // {
    //     path: '', 
    //     component: NoTask,
    //     pathMatch: 'full',
    // },        
    {
        path: 'users/:id',
        component: UserDetails
        
    },
    // { path: 'account', component: AccountComponent, canActivate: [AuthGuardLogin] },
    // { path: 'admin', component: AdminComponent, canActivate: [AuthGuardAdmin] },
    { path: 'notfound', component: NotFound },
    {
        path: '**',
        component: NotFound,
    },
];
