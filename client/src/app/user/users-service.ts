import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private _users = signal<User[]>([]);
  users = this._users.asReadonly();

  selectedUser = signal<User | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);
  url = 'http://localhost:3000/api/'
  loggedIn = false;
  isAdmin = false;
  loadUsers() {
    if (this._users().length > 0) return;

    this.loading.set(true);
    this.error.set(null);
    return this.http.get<User[]>(this.url + 'users')   
      .subscribe({
        next: users => {
          this._users.set(users);
          this.loading.set(false);
          console.log(users)
        },
        error: () => {
          this.error.set('Failed to load users');
          this.loading.set(false);
        }
      });
  }

  selectUser(user: User) {
    this.selectedUser.set(user);
  }

  clearSelection() {
    this.selectedUser.set(null);
  }

  register(user: any) {   
    return this.http.post<User>(`${this.url}register`, user);
  }
  
  login(user: any) {
    return this.http.post(`${this.url}login`, user)    
  }
 
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  getUsers() {
    return this.http.get<User[]>(this.url + 'users').subscribe({
      next: users => {
        this._users.set(users);
        this.loading.set(false);
        console.log(users)
      },
      error: () => {
        this.error.set('Failed to load users');
        this.loading.set(false);
      }
    });;
  }
  countUsers(): Observable<number> {
    return this.http.get<number>(this.url + 'users/count');
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.url + 'user', user);
  }

  getUserById(user: User) {
    console.log('user', user)
    this.http.get<User>(`${this.url}/users/user/${user}`)
      .subscribe({
        next: (user) => console.log(user),
        error: (err) => console.error(err)
      });
  }

  editUser(user: User): Observable<string> {
    return this.http.put(`/api/user/${user.id}`, user, { responseType: 'text' });
  }

  deleteUser(user: User): Observable<string> {
    return this.http.delete(`/api/user/${user.id}`, { responseType: 'text' });
  }
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loggedIn = false;
    this.isAdmin = false;
    this.router.navigate(['/']);
  }
}
