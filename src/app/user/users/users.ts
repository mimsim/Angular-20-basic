import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material';
import { UsersService } from '../users-service';
import { UserDetails } from '../user-details/user-details';

@Component({
  selector: 'app-users',
  imports: [
    CommonModule,
    ...MATERIAL_IMPORTS,    
    UserDetails],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {
  usersService = inject(UsersService)
  users = this.usersService.users 
}
