import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MATERIAL_IMPORTS } from '../../shared/material';
import { Auth } from '../../shared/services/auth';
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
  // private auth = inject(Auth);
    private userService = inject(UsersService);
  private formBuilder = inject(UntypedFormBuilder);
  private router = inject(Router);

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
  constructor() {
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });
  }
  ngOnInit() {
    // if (this.auth.loggedIn) {
    //   this.router.navigate(['/']);
    // }
  }
  login() {
    console.log('Sending login:', this.loginForm.value);
    this.userService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        console.log('Login success:', res);
        this.router.navigate(['/']);
      },
      error: (err: any) => console.error('Login error:', err),
    });
  }
}
