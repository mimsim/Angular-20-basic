import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material';
import { User } from '../user.model';
import { UsersService } from '../users-service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    CommonModule,
    ...MATERIAL_IMPORTS,
    RouterModule],
  templateUrl: './user-details.html',
  styleUrl: './user-details.scss',
})
export class UserDetails {
  private usersService = inject(UsersService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  selectedUser = this.usersService.selectedUser;


  // user = this.usersService.selectedUser;
  userId = computed(() => this.route.snapshot.paramMap.get('id'))
  user = computed(() => {
    const fromState = this.selectedUser()
    if (fromState) {
      return fromState
    }
    return this.usersService.users().find( u => u.id === this.userId())
  })
  constructor() {
    if (this.usersService.users().length === 0) {
      this.usersService.loadUsers();
    }
    console.log('app-user-details', this.user())
  }
  back() {
    this.usersService.clearSelection();
    this.router.navigate(['/']);
  }
}

