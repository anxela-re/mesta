import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  errors: any = null;
  email: FormControl;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService,
  ) {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.forgotPasswordForm = this.fb.group({
      email: this.email,
    });
  }
  ngOnInit(): void {}

  onSubmit(): void {
    this.authService.forgotPassword(this.forgotPasswordForm.value.email).subscribe(
      (result: any) => {
        console.info(result);
      },
      (error: any) => {
        this.errors = error.error;
      }
    );
  }
}
