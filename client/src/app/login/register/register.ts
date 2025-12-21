import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast } from '../../shared/toast/toast/toast';
import { UsersService } from '../../user/users-service';
import { CommonModule } from '@angular/common';
import { MATERIAL_IMPORTS } from '../../shared/material';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ...MATERIAL_IMPORTS,
    ReactiveFormsModule,],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private formBuilder = inject(UntypedFormBuilder);
  private router = inject(Router);
  toast = inject(Toast);
  private userService = inject(UsersService);


  registerForm: UntypedFormGroup;
  name = new UntypedFormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    Validators.pattern('[a-zA-Z0-9_-\\s]*')
  ]);
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
  role = new UntypedFormControl('', [
    Validators.required
  ]);

  constructor() {
    this.registerForm = this.formBuilder.group({
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role
    });
  }
  register() {
    console.log('')
  }
}
