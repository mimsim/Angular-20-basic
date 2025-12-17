import { Routes } from '@angular/router';
import { Tasks } from '../tasks/tasks/tasks';
import { NewTask } from '../tasks/new-task/new-task';



export const routes: Routes = [
    {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full',
    },
    {
        path: 'tasks', // <your-domain>/users/<uid>/tasks
        component: Tasks,
        runGuardsAndResolvers: 'always',
        // resolve: {
        //     userTasks: resolveUserTasks,
        // },
    },
    {
        path: 'tasks/new',
        component: NewTask,
        // canDeactivate: [canLeaveEditPage]
    },
];