import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MATERIAL_IMPORTS } from '../../shared/material';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../../user/users-service';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ...MATERIAL_IMPORTS,
    RouterModule,
    ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private userService = inject(UsersService);
  private formBuilder = inject(UntypedFormBuilder);
  private router = inject(Router);
  decodedUser: any;
  isAdmin: any;
  loginForm: UntypedFormGroup;
  email = new UntypedFormControl('', [
    Validators.email,
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100)
  ]);
  password = new UntypedFormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);
  loggedIn: boolean = false;
  userInfo: any;
  constructor() {
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });  

    const token = localStorage.getItem('token');
    if (token) {
      this.decodedUser = token;
      this.userInfo = localStorage.getItem('user');
    }
  }

  loginFormSubmit() {
    console.log('Sending login:', this.loginForm.value);
    this.userService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        console.log('Login success:', res);
        console.log('user:', res.user);
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.userService.loggedIn = true;
        this.router.navigate(['/']);
      },
      error: (err: any) => console.error('Login error:', err),
    });
  }

}
