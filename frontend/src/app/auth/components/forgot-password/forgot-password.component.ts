import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStateService } from '../../services/auth-state.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  errors: any = null;
  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: [],
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
