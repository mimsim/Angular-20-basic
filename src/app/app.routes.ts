import { Routes } from '@angular/router';
import { ROOT_PATHS } from './constants/paths.constants';
import { Home } from './pages/home/home';

export const routes: Routes = [
    {
        path: ROOT_PATHS.home,
        component: Home,
      },
];
