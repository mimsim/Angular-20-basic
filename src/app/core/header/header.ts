import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { MaterialModule } from '../../material-module';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AUTH_URLS } from '../../constants/paths.constants';

@Component({
  selector: 'app-header',
  imports: [
    MaterialModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Header {
  private readonly router = inject(Router);
  readonly AUTH_URLS = AUTH_URLS;
  
  toggleTheme(event: Event) {
    const input = event.target as HTMLInputElement;
    const isDark = input.checked;
    const body = document.body;
    body.classList.remove('light-theme', 'dark-theme');
    body.classList.add(isDark ? 'dark-theme' : 'light-theme');
  }
}
