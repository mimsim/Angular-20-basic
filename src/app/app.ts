import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header/header';
import { Users } from './user/users/users';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Users],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'angular21';
}
