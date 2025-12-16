import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material';

@Component({
  selector: 'app-user-details',
  imports: [CommonModule,
    ...MATERIAL_IMPORTS],
  templateUrl: './user-details.html',
  styleUrl: './user-details.scss',
})
export class UserDetails {

}
