import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material';
import { UsersService } from '../../user/users-service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule,
    ...MATERIAL_IMPORTS,
  RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  userService = inject(UsersService);
  private router = inject(Router);
  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
