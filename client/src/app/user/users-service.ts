import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';

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

  loadUsers() {
    if (this._users().length > 0) return;

    this.loading.set(true);
    this.error.set(null);

    this.http
      .get<User[]>('https://jsonplaceholder.typicode.com/users')
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
}
