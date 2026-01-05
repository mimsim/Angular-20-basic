import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material';
import { UsersService } from '../users-service';
import { Router, RouterModule } from '@angular/router';
import { User } from '../user.model';


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    ...MATERIAL_IMPORTS,    
    RouterModule],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {
  usersService = inject(UsersService);
  router = inject(Router)

  users = this.usersService.users;
  loading = this.usersService.loading;
  error = this.usersService.error;
  constructor() {
    // this.usersService.loadUsers();
    this.usersService.getUsers()
    console.log('app-users', this.users)
  }
  onSelect(user: User) {
    this.usersService.selectUser(user); // ✅ set signal
    console.log('app-users', user)
    this.router.navigate(['/users', user.id]); // ✅ navigate
  }
 
}
