import { inject, Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { Toast } from '../toast/toast/toast';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../user/user.model';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private router = inject(Router);
  toast = inject(Toast);
  loggedIn = false;
  isAdmin = false;
  url = 'http://localhost:3000/api/'
  currentUser: User | undefined;
  
  login(user: any) {
    console.log('user', user)
    return this.http.post(`${this.url}login`, user);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.isAdmin = false;
    // this.currentUser = new User();
    this.router.navigate(['/']);
  }
}
