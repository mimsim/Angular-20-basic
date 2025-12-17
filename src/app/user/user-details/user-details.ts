import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material';
import { User } from '../user.model';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-user-details',
  imports: [
    CommonModule,
    ...MATERIAL_IMPORTS,
    RouterLink,
    RouterLinkActive],
  templateUrl: './user-details.html',
  styleUrl: './user-details.scss',
})
export class UserDetails {
  user = input.required<User>();

  imagePath = computed(() => 'users/' + this.user().avatar);
}
