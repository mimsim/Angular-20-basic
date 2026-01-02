import { Routes } from '@angular/router';
import { Users } from './user/users/users';
import { NoTask } from './tasks/no-task/no-task';
import { UserTasks } from './user/user-tasks/user-tasks';
import { NotFound } from './not-found/not-found';
import { UserDetails } from './user/user-details/user-details';
import { Login } from './login/login/login';
import { Register } from './login/register/register';

export const routes: Routes = [
    {
        path: '', // <your-domain>/
        component: NoTask,
        // component: Users,   
        // redirectTo: '/users/u1',
        pathMatch: 'full',
        // title: 'No task selected',
    },
    {
        path: 'users', 
        component: Users,      
    },    
    {
        path: 'users/:id',
        component: UserDetails
        // loadComponent: () =>
        //     import('./user/user-details/user-details')
        //         .then(m => m.UserDetails),
        // path: 'users/:userId', // <your-domain>/users/<uid>
        // component: UserTasks,
        // component: UserDetails
        // children: userRoutes,
        // canMatch: [dummyCanMatch],
        // data: {
        //     message: 'Hello!',
        // },
        // resolve: {
        //     userName: resolveUserName,
        // },
        // title: resolveTitle,
    },
    { path: 'login', component: Login },
    { path: 'register', component: Register },

    // { path: 'account', component: AccountComponent, canActivate: [AuthGuardLogin] },
    // { path: 'admin', component: AdminComponent, canActivate: [AuthGuardAdmin] },
    { path: 'notfound', component: NotFound },
    {
        path: '**',
        component: NotFound,
    },
];
