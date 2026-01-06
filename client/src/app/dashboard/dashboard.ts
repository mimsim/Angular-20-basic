import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MATERIAL_IMPORTS } from '../shared/material';
import { Header } from '../header/header/header';
import { Users } from '../user/users/users';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    ...MATERIAL_IMPORTS,
    RouterModule,
    RouterOutlet, Header, Users],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

}
