import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../shared/material';

@Component({
  selector: 'app-header',
  imports: [CommonModule,
    ...MATERIAL_IMPORTS],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

}
