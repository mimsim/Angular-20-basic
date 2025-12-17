import { Routes } from '@angular/router';
import { Users } from './user/users/users';

export const routes: Routes = [
    {
        path: 'users', // <your-domain>/users/<uid>
        component: Users,
      
    },
];
