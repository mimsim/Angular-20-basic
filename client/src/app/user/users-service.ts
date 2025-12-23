import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);

  private _users = signal<User[]>([]);
  users = this._users.asReadonly();

  selectedUser = signal<User | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);
  url = 'http://localhost:3000/api/'
  loadUsers() {
    if (this._users().length > 0) return;

    this.loading.set(true);
    this.error.set(null);
    return this.http.get<User[]>(this.url + 'users')
    // this.http
    //   .get<User[]>('https://jsonplaceholder.typicode.com/users')
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

  //node js

  register(user: User): Observable<User> {
    return this.http.post<User>(this.url + 'user', user);
  }

  login(credentials: { email: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.url + 'login', credentials);
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
    // return this.http.get<User>(`/api/user/${user.id}`);
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
}
