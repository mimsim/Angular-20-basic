import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);
  const token = localStorage.getItem('token');

  let authReq = req;

  // Добавяме токена, ако има такъв
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {

      // --- ПРЕНАСОЧВАНИЯ ---
      if (error.status >= 400 && error.status < 500) {
        router.navigate(['/client-error']);   // <-- маршрут за 4xx
      }

      if (error.status === 500) {
        router.navigate(['/server-error']);   // <-- маршрут за 500
      }

      // Ако искаш за конкретен код:
      if (error.status === 506) {
        router.navigate(['/special-error']);  // <-- тук смени по желание
      }

      return throwError(() => error);
    })
  );
};
