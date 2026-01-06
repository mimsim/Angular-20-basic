import { CanActivateFn, Router } from '@angular/router';
import { Auth } from './shared/services/auth';
import { inject } from '@angular/core';
import { UsersService } from './user/users-service';

export const authGuard: CanActivateFn = (route, state) => {
  const usersService = inject(UsersService);
  const router = inject(Router);

  if (usersService.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
